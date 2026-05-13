import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsPage = () => {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="May 13, 2026">
      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing and using the Flowkit platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">2. Use License</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on Flowkit's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">3. Disclaimer</h2>
      <p>
        The materials on Flowkit's website are provided on an 'as is' basis. Flowkit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8 mb-4">4. Limitations</h2>
      <p>
        In no event shall Flowkit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Flowkit's website, even if Flowkit or a Flowkit authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>
    </LegalPageLayout>
  );
};

export default TermsPage;
