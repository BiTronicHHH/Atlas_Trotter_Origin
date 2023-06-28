import { NextSeo } from 'next-seo';
import React, { Component } from 'react';

class TermsConditions extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="prose">
        <NextSeo
          title={`Atlas Trotter Terms and Conditions`}
          description={
            'Terms and Conditions of Atlas Trotter. Please read it before using our website.'
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
            Terms and Conditions
          </h1>

          <p>
            Welcome to Atlas Trotter, a website dedicated to helping you plan
            your travels and discover new destinations. By using our website,
            you agree to comply with and be bound by the following terms and
            conditions of use:
          </p>
          <h2>General Terms</h2>
          <p>
            You acknowledge that the information and material provided on Atlas
            Trotter is for general information only and is subject to change
            without notice. We do not provide any warranty or guarantee as to
            the accuracy, timeliness, performance, completeness, or suitability
            of the information and materials found or offered on this website
            for any particular purpose.
          </p>
          <p>
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It is your
            responsibility to ensure that any products, services, or information
            available through this website meet your specific requirements.
          </p>
          <p>
            This website contains material that is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance, and graphics. Reproduction is prohibited other
            than in accordance with the copyright notice, which forms part of
            these terms and conditions.
          </p>
          <p>
            All trademarks reproduced on this website, which are not the
            property of, or licensed to the operator, are acknowledged on the
            website.
          </p>
          <h2>Links to Third-Party Websites</h2>
          <p>
            Our website may contain links to other websites that are not under
            the control of Atlas Trotter. We have no control over the nature,
            content, and availability of those sites. The inclusion of any links
            does not necessarily imply a recommendation or endorse the views
            expressed within them.
          </p>
          <h2>Affiliate Links</h2>
          <p>
            Atlas Trotter may include affiliate links, which means we may earn a
            commission if you make a purchase through those links. We only
            recommend products or services that we believe will add value to our
            users.
          </p>
          <h2>User Data</h2>
          <p>
            Atlas Trotter collects user data including email addresses, which
            will remain private, and names, which may be displayed publicly on
            the website. By using our website, you consent to the collection and
            use of this information in accordance with our{' '}
            <a href="/privacypolicy">Privacy Policy</a>.
          </p>
          <h2>Modifications</h2>
          <p>
            Atlas Trotter reserves the right to modify these terms and
            conditions at any time without prior notice. Your continued use of
            the website after any changes to the terms and conditions
            constitutes your acceptance of the modified terms and conditions.
          </p>
          <p>Last updated: 17/03/2023</p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about these terms and conditions, you can
            contact us:
          </p>
          <ul>
            <li>By email: contact@atlastrotter.com</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default TermsConditions;
