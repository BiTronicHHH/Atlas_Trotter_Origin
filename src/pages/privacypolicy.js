import { NextSeo } from 'next-seo';
import React, { Component } from 'react';

class PrivacyPolicy extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="prose">
        <NextSeo
          title={`Atlas Trotter Privacy Policy`}
          description={
            'Privacy Policy of Atlas Trotter. Please read it before using our website.'
          }
        />

        <div
          style={{
            padding: '30px',
            textAlign: 'left',
            maxWidth: '1200px',
            margin: 'auto',
          }}>
          <h1 className="text-2xl font-extrabold sm:text-center sm:text-4xl mb-6">
            Privacy Policy
          </h1>
          <p>
            At Atlas Trotter, we take your privacy seriously. This Privacy
            Policy describes how we collect, use, and protect your personal
            information when you visit our website and use our services.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We collect personal information from you when you register on our
            website, place an order, subscribe to our newsletter, respond to a
            survey, or fill out a form. The information we collect may include
            your name, email address, mailing address, and phone number.
          </p>
          <h2>How We Use Your Information</h2>
          <p>We may use your personal information to:</p>
          <ul>
            <li>Send periodic emails</li>
            <li>Personalize your experience</li>
            <li>Improve customer service</li>
            <li>
              Administer a contest, promotion, survey or other site feature
            </li>
            <li>Send you marketing communications</li>
          </ul>
          <p>
            Your personal information will never be sold, exchanged,
            transferred, or given to any other company for any reason without
            your consent, other than for the express purpose of delivering the
            purchased product or service requested.
          </p>
          <h2>How We Protect Your Information</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, alteration, and disclosure. We use
            secure servers and encrypt all of our transmissions.
          </p>
          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your user experience and remember your
            preferences. You can choose to disable cookies through your
            individual browser options. However, this may affect your ability to
            use certain features of our website.
          </p>
          <h2>Third Party Links</h2>
          <p>
            Our website may contain links to third party websites. These
            websites have their own privacy policies, which you should review
            before providing them with your personal information. We have no
            responsibility or liability for the content and activities of these
            linked sites.
          </p>
          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We reserve the right to make changes to our Privacy Policy at any
            time without notice. Any changes will be posted on this page.
          </p>
          <p>Last updated: 17/03/2023</p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about this privacy policy, you can contact
            us:
          </p>
          <ul>
            <li>By email: contact@atlastrotter.com</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default PrivacyPolicy;
