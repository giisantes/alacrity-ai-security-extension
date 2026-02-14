# Updates

Hey guys, please could you email me if you are interested in continuing this project (since nobody has interacted since the hackathon):

YousefG@cardiff.ac.uk

Great fundamentals built in the hackathon! 

# Now that we have more time:

- It would be great if we could start branching (from development) based on the features you are working on.

- We should also start using issues so that we arent all working on the same task in different ways.

- Please try to limit the use of AI-generated code, and if necessary, check and test it before pushing. 

# Minimum Functional Requirements

The extension should have four core capabilities:
 1. Detect Potential AI URLs
This is basic domain-level detection.

 2. Detect AI Usage Within Applications
Beyond domain detection, the extension should attempt to identify AI interaction within applications.
Examples:
Detecting prompt fields
Detecting paste events into known AI input areas
Detecting embedded AI widgets

The goal is to detect AI interaction — not analyse user content. Privacy is a red line although there are organisations which would want the extension to read the prompts as well. 
 
3. User Interaction (Pop-Up or Redirect)
When AI usage is detected, the extension should be able to intervene in a lightweight way.
Possible approaches:
Displaying a contextual pop-up 
Showing a warning message (this domain/tool is not approved for sensitive data — can you confirm you're not pasting sensitive data or click on the 'redirect to approved ai' button) 


P.S: Try to find a way to make it hard for users to continue using which motivates them to use the approved AI.
Asking a simple yes/no confirmation (for them to declare they're not using sensitive data)
Redirecting to an approved internal AI route (the company's approved ai environment - refer to openrouter.io)
This is not about blocking everything.
It is about guidance and controlled routing.


4. Collect Logs / Signals (Metadata Only)
The extension should capture signal-level logs such as:
Domain accessed
Timestamp
Type of interaction
Whether a pop-up was triggered
Whether the user continued or was redirected
Identification of the user/role 
It must not collect:
Prompt text
Pasted content
Keystrokes
Sensitive user data
We are capturing evidence, not content.

# Ideal User Journey

An employee opens their browser and visits an AI tool.
The extension recognises the interaction.
A contextual pop-up appears, for example:
“This tool is not approved — would you like to continue?”
or
“Please confirm no sensitive data will be shared.”
The interaction is logged.
If they are pasting sensitive data, the user may be redirected to an approved internal AI environment.
From the employee’s perspective:
The experience is lightweight, interrupts their existing workflows.
It does not unnecessarily block productivity
It creates awareness and accountability
It generates visibility for security teams
