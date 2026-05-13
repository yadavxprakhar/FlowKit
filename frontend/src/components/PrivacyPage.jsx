import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPage = () => {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="May 13, 2026">
      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">2. How We Use Your Information</h2>
      <p>
        We may use the information we collect about you to: Provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">3. Data Sharing and Disclosure</h2>
      <p>
        We do not sell or share your personal information with third parties for their direct marketing purposes. We may share information as described in this policy, such as with vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">4. Your Choices</h2>
      <p>
        You may correct your account information at any time by logging into your online or in-app account. If you wish to cancel your account, please email us at privacy@flowkit.com. Please note that in some cases we may retain certain information about you as required by law, or for legitimate business purposes to the extent permitted by law.
      </p>
    </LegalPageLayout>
  );
};

export default PrivacyPage;
