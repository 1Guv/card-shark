import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XanoStripeService {

  xanoStripeCheckoutApi = 'https://api.stripe.com/v1/checkout/sessions';

  domain = 'http://localhost:4242';

  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer sk_test_51OuG6TEi1sf3ZM0t1tFmNfyBbV3rjHR3pI9DlhhlMTYtuZ3qY2klmITfkdngd71tjX0Ssxt6lyqrddmQGOe5LVVA006QzQJu6v`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
  }


  constructor(
    private http: HttpClient
  ) {}

  createCheckoutSession(price: string) {
    const sessionObj = {
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.domain}/account-dashboard`,
      cancel_url: `${this.domain}/cancel.html`,
      // success_url: `https://localhost:4200/account-dashboard/`,
      // payment_method_types: ['card'],
      // line_items: price,
      // payment_intent_data: {
      //     transfer_data: {
      //         amount: price,
      //         destination: '',
      //     },
      // },
      // cancel_url: `https://localhost:4200/cancel/`,
      // price: price,
      // success_url: 'https://localhost:4200/account-dashboard',
    };
    console.log('sessionObj', sessionObj);
    return this.http.post(this.xanoStripeCheckoutApi, sessionObj, this.header);
  }
}
