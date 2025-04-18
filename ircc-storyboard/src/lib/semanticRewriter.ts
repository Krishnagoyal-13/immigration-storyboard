
interface RewriteOptions {
    context?: string;
    followUpStep?: string;
    userType?: "student" | "worker" | "visitor" | "citizen";
    intent?: "eligibility" | "documents" | "apply" | "timeline" | "fees";
  }
  
  export function rewritePrompt(userQuery: string, options: RewriteOptions = {}): string {
    const base = userQuery.trim();
    const parts: string[] = [];
  
    // Base description
    parts.push(`You are an expert assistant trained in Canadian immigration law.`);
  
    // Add context or intent if provided
    if (options.userType) {
      parts.push(`The user is a ${options.userType} looking for help.`);
    }
    if (options.intent) {
      parts.push(`They are specifically asking about ${options.intent}.`);
    }
    if (options.context) {
      parts.push(`Context: ${options.context}`);
    }
  
    // Follow-up step expansion
    if (options.followUpStep) {
      parts.push(`They want more details about the step: "${options.followUpStep}".`);
    }
  
    // User query
    parts.push(`User query: "${base}"`);
  
    // Final formatting instruction
    parts.push(`Respond ONLY in double-quoted JSON array format like:
  [
    {
      "step_number": 1,
      "title": "Step Title",
      "description": "Step description here."
    },
    ...
  ]`);
  
    return parts.join("\n");
  }
  
  /**
   * Example usage:
   * rewritePrompt("How to apply for a PGWP?", {
   *   userType: "student",
   *   intent: "apply"
   * })
   */
  