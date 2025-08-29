import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SmsVerification from './pages/sms-verification';
import SignatureCompletionDashboard from './pages/signature-completion-dashboard';
import OrganizationDashboard from './pages/organization-dashboard';
import EmailVerification from './pages/email-verification';
import SignatureCollectionCanvas from './pages/signature-collection-canvas';
import EuCredentialVerificationHub from './pages/eu-credential-verification-hub';
import OfficialDocumentGenerator from './pages/official-document-generator';
import CommunityCertificationDashboard from './pages/community-certification-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmailVerification />} />
        <Route path="/sms-verification" element={<SmsVerification />} />
        <Route path="/signature-completion-dashboard" element={<SignatureCompletionDashboard />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/signature-collection-canvas" element={<SignatureCollectionCanvas />} />
        <Route path="/eu-credential-verification-hub" element={<EuCredentialVerificationHub />} />
        <Route path="/official-document-generator" element={<OfficialDocumentGenerator />} />
        <Route path="/community-certification-dashboard" element={<CommunityCertificationDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;