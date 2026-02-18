Huge Thanks for organising this hackathon, it quite a fun challenge in which I learned many thing in new areas. Please take into consideration that I was working solo on this project and that given more time, I would be able to offer a more complete extension across multiple browsers

# Installation

1. Download the source code: Using the command terminal, navigate to the desired file location and run "git clone https://github.com/giisantes/alacrity-ai-security-extension.git"
2. Open a chromium based web browser and navigate to the extensions management page: Type "chrome://extensions/" and press enter in the search bar
3. enable developer mode
4. Press "load unpacked" and upload the folder you downloaded <img width="1912" height="220" alt="image" src="https://github.com/user-attachments/assets/dadcf1fc-3254-4132-8539-5f3902252493" />

5. try accessing an ai domain such as https://www.chatgpt.com

# Snippets

<img width="1895" height="997" alt="alacrity dashboard" src="https://github.com/user-attachments/assets/f2e64c52-d6a7-4e17-8f03-937f290642bc" />

Here, I attempted to replicate the styling on the alacrity website, including the buttons changing colour when hovered over, and the logo enlarging, when clicked on it redirects to https://alacrityfoundation.co.uk/

<img width="1906" height="914" alt="dwad" src="https://github.com/user-attachments/assets/01309d74-d58f-4e8a-b716-686db693d492" />

<img width="1911" height="1001" alt="usernotloggedin" src="https://github.com/user-attachments/assets/9f6e7185-09f9-45f0-aed2-664d9148c1b2" />

<img width="1900" height="944" alt="alternate design checkbox 5secondtimer" src="https://github.com/user-attachments/assets/19510d83-fc85-4fb7-be92-1a691db89150" />



# Next Steps

- Add a real database, currently we're using a hardcoded admin to add employees, this would be a security issue but is acceptable for an MVP
- Link up to a large database of ai domain, or use an api, or less reliably, screen for domains such as ".ai"

- Add various surveilence levels admins can select from --> may require more metadata such as input prompts

Potential features that I considered using (or removed temporarily for re-styling); 5-10 second timer before being able to continue past popup on unapproved ai domains, mandatory checkbox agreeing not to input sensitive company data also blocking the continue button, timer only starts after the checkbox has been ticked. This aims to be less restricting by making the unapproved AI so inconveinient to use that employees opt for the approved domains.


///////////////////////////
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
