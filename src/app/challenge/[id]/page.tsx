'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { saveUserProgress, getUserProgress } from '@/utils/userProgress';
import DocumentViewer from '@/components/DocumentViewer';
import Timer from '@/components/Timer';
import ProgressTracker from '@/components/ProgressTracker';

const mockDocument = `
Knowledge Article 1: New Customer Account Creation

Title: New Customer Account Creation - SecureGrowth Online Bank

Purpose:
This procedure outlines the steps for assisting new customers in creating their initial account with SecureGrowth Online Bank via our secure web platform or mobile app.

Required Information/Documents:
- Valid government-issued photo ID (e.g., driver's license, passport) - digital copy required
- Social Security Number or Individual Taxpayer Identification Number
- Current residential address
- Date of birth
- Valid email address
- U.S. mobile phone number for two-factor authentication
- Initial deposit amount (optional, minimum $25 for savings account)

Step-by-step Instructions:

1. Direct the customer to the SecureGrowth Online Bank homepage and guide them to click on the "Open an Account" button.

2. Assist the customer in selecting the type of account they wish to open (e.g., Savings, Checking).

3. Guide the customer through entering their personal information:
   a. Full name
   b. Date of birth
   c. Social Security Number or ITIN
   d. Current address
   e. Phone number
   f. Email address

4. Instruct the customer to create a unique username and strong password for their online banking access.

5. Guide the customer through the two-factor authentication setup process, which requires them to verify their mobile phone number.

6. Inform the customer that an automated Know Your Customer (KYC) check will be performed. Use this script:

   "Our system will now perform a quick identity verification check. This is a standard procedure required by federal regulations. It should only take a few moments."

7. If the customer passes the automated KYC check, proceed to step 8. If not, inform them that additional verification may be required and transfer them to our Enhanced Due Diligence (EDD) team.

8. Assist the customer in uploading a clear digital copy of their government-issued ID.

9. Guide the customer through the initial deposit process (if they choose to make one):
   a. Enter deposit amount
   b. Select funding method (ACH transfer, debit card, etc.)

10. Before the customer submits their application, provide the following verbal disclosures:

    "Before you proceed, I need to inform you about some key aspects of your new account:

    a) FDIC Insurance: Your deposits are FDIC insured up to $250,000.
    b) Online Access: You'll have 24/7 access to your account through our web portal and mobile app.
    c) Customer Support: Our support team is available 24/7 via chat or phone.
    d) Account Agreements: You'll receive all account agreements and disclosures via email.

    Do you have any questions about these terms?"

11. Guide the customer to review and accept the account agreements and disclosures on their screen.

12. Assist the customer in submitting their application and confirm that they receive a confirmation email.

13. Explain the next steps:

    "You'll receive an email confirmation once your account is fully set up, which typically happens within one business day. You can then log in to your SecureGrowth Online Banking dashboard to start managing your account."

14. Conclude the interaction:

    "Thank you for choosing SecureGrowth Online Bank. Is there anything else I can assist you with today? Remember, if you have any questions, you can reach our customer service team 24/7 via chat in your online banking portal or by calling 1-800-555-GROW."

Required Disclosures:
Ensure the customer receives the following disclosures via email:
- Account Agreement
- Truth in Savings Disclosure
- Rate and Fee Schedule
- Privacy Policy
- Electronic Communication Agreement

Important Notes:
- Remind customers to keep their login credentials secure and not to share them with anyone.
- Encourage customers to set up account alerts for added security.
- Inform customers about the mobile app download process for convenient account management.

Related Processes:
- Enhanced Due Diligence (EDD) Procedure
- External Account Linking Procedure
- Mobile App Setup Procedure
- Customer Information Update Procedure
`;

interface UserProgress {
  completedChallenges: number;
  totalChallenges: number;
}

export default function Challenge({ params }: { params: { id: string } }) {
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({ completedChallenges: 0, totalChallenges: 5 });
  const router = useRouter();
  const { user, loading } = useAuth();
  const id = params.id;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user) {
      getUserProgress(user.uid).then((progress) => {
        if (progress) {
          setUserProgress(progress);
        }
      });
    }
  }, [user, loading, router]);

  const handleTimeUp = () => {
    setChallengeComplete(true);
    if (user) {
      const newProgress = {
        ...userProgress,
        completedChallenges: userProgress.completedChallenges + 1
      };
      setUserProgress(newProgress);
      saveUserProgress(user.uid, newProgress);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access challenges.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">Document Navigation Challenge {id}</h1>
      <ProgressTracker 
        totalChallenges={userProgress.totalChallenges} 
        completedChallenges={userProgress.completedChallenges} 
      />
      <Timer duration={300} onTimeUp={handleTimeUp} />
      <div className="my-4">
        <DocumentViewer content={mockDocument} />
      </div>
      {challengeComplete && (
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => router.push(`/challenge/${Number(id) + 1}`)}
        >
          Next Challenge
        </button>
      )}
    </main>
  );
}