//import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
//export const helloWorld = functions.https.onRequest((request, response) => {
 /// response.send("Hello from Firebase!");
 //});
 const functions = require('firebase-functions');
 const admin = require('firebase-admin');
 admin.initializeApp();

 const stripe = require('stripe')(functions.config().stripe.testkey);

 exports.createStripeCustomer = functions.database.ref('/users/{userId}').onWrite((event) => {
    // user auth data
    const user = event.data;
    console.log(user.email);
    
    // register Stripe user
    return stripe.customers.create({
    email:user.email
      })
      .then(customer => {
    /// update database with stripe customer id
    
    const data = { customerId: customer.id }
    console.log(data);
        
        const updates = {}
        updates[`/customers/${customer.id}`]     = user.uid
        updates[`/users/${user.uid}/customerId`] = customer.id
        
        
        return admin.database().ref().update(updates);
      }),
      (err) => {
          console.log('Something went wrong');
      };
  });



  exports.createSubscription = functions.database.ref('/users/{userId}/pro-membership/token').onWrite(event => {
    
const tokenId = event.after.val();
const userId  = event.params.userId;


if (!tokenId) throw new Error('token missing');

return admin.database()
.ref(`/users/${userId}`)
.once('value')
.then(snapshot => snapshot.val())
.then(user => {

return stripe.subscriptions.create({
customer: user.customerId,
source: tokenId,
items: [
{
plan: 'pro-membership',
},
],
});

})
.then(sub => {
admin.database()
.ref(`/users/${userId}/pro-membership`)
.update( {status: 'active'} )


})
.catch(err => console.log(err))

});


exports.recurringPayment = functions.https.onRequest((req, res) => {
  
      const hook  = req.body.type
      const data  = req.body.data.object
  
      if (!data) throw new Error('missing data')
      
      return admin.database()
        .ref(`/customers/${data.customer}`)
        .once('value')
        .then(snapshot => snapshot.val())
        .then((userId) => {
          const ref = admin.database().ref(`/users/${userId}/pro-membership`)
            
            // Handle successful payment webhook
            if (hook === 'invoice.payment_succeeded') {
              return ref.update({ status: 'active' });
              }
      
            // Handle failed payment webhook
            if (hook === 'invoice.payment_failed') {
              return ref.update({ status: 'pastDue' });
            }
  
  
         })
         .then(() => res.status(200).send(`successfully handled ${hook}`) )
         .catch(err => res.status(400).send(`error handling ${hook}`))
  
  
  });
  