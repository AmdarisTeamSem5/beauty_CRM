// /components/layout/registration/SuccessPage.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle,
  Clock,
  Mail,
  Users
} from 'lucide-react';

export default function SuccessPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registration <span className="text-purple-600">Submitted!</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Thank you for choosing SalonCRM. Your registration is now under review.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="font-medium">Application Status</span>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Under Review
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Registration received and verified</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Quality review in progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Final approval and dashboard access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
              <div className="text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium">Review Time</div>
                <div className="text-sm text-gray-500">24-48 hours</div>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium">Notification</div>
                <div className="text-sm text-gray-500">Via email</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">While You Wait...</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Prepare Your Team</div>
                    <div className="text-sm text-gray-600">
                      Let your staff know about the new system and consider who will manage the account initially.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Plan Your Services</div>
                    <div className="text-sm text-gray-600">
                      Think about the services you want to offer and their pricing. You'll be able to add these once approved.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Watch Your Email</div>
                    <div className="text-sm text-gray-600">
                      We'll send you a detailed email with next steps once your salon is approved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium text-gray-700">How long does the review process take?</div>
                <div className="text-gray-600">Typically 24-48 hours during business days.</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">What happens after approval?</div>
                <div className="text-gray-600">You'll receive login credentials and can start setting up your services and booking calendar.</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Can I make changes to my application?</div>
                <div className="text-gray-600">Contact our support team if you need to update any information.</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}