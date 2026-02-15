export default function PrivacyPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: 2025-01-01</p>

      <h2>Overview</h2>
      <p>
        Lang Heniiii is a self-hosted language learning tool. Your privacy is important to us.
        This application is designed to be run locally, and no data is sent to our servers.
      </p>

      <h2>Data Collection</h2>
      <p>
        This application does <strong>not</strong> collect, store, or transmit any personal data
        to external servers controlled by us.
      </p>

      <h2>API Keys</h2>
      <p>
        Your API keys are stored locally in your browser&apos;s localStorage.
        They are only sent directly to the AI provider you have selected (OpenAI or Google).
        We do not have access to your API keys.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        When you use this tool, your input text is sent to the AI provider you have configured:
      </p>
      <ul>
        <li><strong>OpenAI</strong> — subject to <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">OpenAI&apos;s Privacy Policy</a></li>
        <li><strong>Google Gemini</strong> — subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a></li>
      </ul>

      <h2>Local Storage</h2>
      <p>
        Settings and preferences are saved in your browser&apos;s localStorage.
        Analysis results are stored in sessionStorage and are cleared when you close the browser tab.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this privacy policy, please open an issue on the project repository.
      </p>
    </div>
  );
}
