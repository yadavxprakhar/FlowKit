import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const SecurityPage = () => {
  return (
    <LegalPageLayout title="Security Information" lastUpdated="May 13, 2026">
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Data Encryption</h2>
      <p>
        Security is our top priority. All data transmitted between your browser and our servers is encrypted in transit using industry-standard TLS protocols. Your data at rest is encrypted using AES-256 encryption.
      </p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Infrastructure Security</h2>
      <p>
        Our services are hosted on world-class infrastructure providers that maintain strict physical and digital security protocols. Our servers are continually monitored, patched, and audited to ensure they meet the highest security standards.
      </p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Authentication & Access</h2>
      <p>
        We use secure JWT (JSON Web Tokens) for authentication. We strongly encourage all users to use strong, unique passwords. Role-based access control (RBAC) is implemented at the core level to ensure users only have access to data they are authorized to view.
      </p>

      <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Vulnerability Reporting</h2>
      <p>
        We welcome reports from security researchers and experts about possible security vulnerabilities in our service. If you believe you have discovered a vulnerability, please contact us immediately at security@flowkit.com. We investigate all legitimate reports and strive to fix them quickly.
      </p>
    </LegalPageLayout>
  );
};

export default SecurityPage;
