## Inspiration 
Remember those evenings at the kitchen table, with your parents hovering over your shoulder, asking 'Isn't this easy?' or 'Why not 100%?' as you grappled with homework? Ah, the memories! Well, it's time to bring a slice of that nostalgia into the present with "Why Not 100%?" Study Helper, an app that blends parental wisdom with modern AI technology for a unique twist on education, making it feel as if your parent still knows everything that you were learning in school. 

## What it does
**The Classroom Tab:**
Imagine capturing every word of your professor's lecture without missing a beat. Our app does just that, securely uploading your recordings to _Google Cloud Storage_ and converting them into clear transcripts using _Google Cloud's Speech-to-Text_. But the real magic happens next.

**The Kitchen Tab:**
This is where your education really gets enhanced, by tapping into the study techniques that built you to where you are today. Here, the past meets the future. Choose from the 'Strict Scholar' or the 'Supportive Sage' parental tones. Craving that rigorous push toward academic excellence? The 'Strict Scholar' is your go-to for a motivating, albeit slightly daunting, learning experience. Or, if you're in need of a kinder, gentler approach, let the 'Supportive Sage' guide you with the comforting wisdom of a parent's help at the kitchen table. You can choose whatever experience motivated you growing up! Powered by _Cohere’s AI_, our app doesn't just replay lectures; it transforms them into summaries, quizzes, and clarifications, all presented to you by your parent, just as they did back in the day. Whether it was the pressure or comfort of them watching you that made you study harder, now they will always be there guiding you with a touch of nostalgia.

## How we built it
**Front-End Development:**
We utilized React and Next.js to create a dynamic and responsive user interface. These tools enabled us to implement features like switching between dark and light modes and selecting different parental figures and tones.

**Back-End Development:**
The back end is powered by Python, using Django for robust data handling and Node.js for efficient server-side operations. This combination provided the flexibility and scalability needed for processing and storing complex data.

**Audio Processing:**
On the front end, lectures are recorded in the webm format. These audio files are then converted to .wav format for compatibility and further processing.

**Integration with Cloud Services:**
The converted audio files are uploaded to Google Cloud Storage. This step ensures secure and scalable storage of lecture recordings.

**Speech-to-Text Conversion:**
Google Cloud’s Speech-to-Text function is employed to transcribe the lecture material accurately. This critical step transforms audio recordings into textual data for further processing.

**Text Generation and Summarization:**
We integrated Cohere’s API for its generate and summarize functions. This AI-driven process takes the transcribed text and converts it into comprehensible summaries and interactive content while emulating the guidance and caring emotions of your parent.

**User Interface Features:**
The front-end design allows users to interact with the summaries and generate content easily. Users can toggle between various modes and select different parental tones to personalize their learning experience. Most importantly, Why Not 100%? is designed to act like your parent. It confronts you about your learning like a parent who wants you to succeed and converses with you to help reinforce your learning in a natural, human way.


## Challenges we ran into

Throughout the development of "Why not 100%?", we faced challenges that proved instrumental in our growth as both developers and a close-knit team. One major challenge was seamlessly integrating the front end and back end, teaching us the importance of effective system integration and communication.

Moreover, each team member willingly embraced new roles and technologies, including APIs, Django, and Next.js. The steep learning curve with new technologies was daunting but rewarding. We embraced the opportunity to step out of our comfort zones, enhancing our capabilities in software development.


## Accomplishments that we're proud of

We are thrilled to have developed a fully functional application that is not only effective but also scalable. The integration with Google Cloud's services allows our app to handle up to 480 minutes (8 hours) of asynchronous speech recognition, ensuring it can accommodate extensive lectures without compromising performance.

Each team member stepped into uncharted territory and emerged more knowledgeable and skilled. Whether it was tackling new programming languages, frameworks, or technologies, we all learned something new and valuable. This collective growth is not just an accomplishment for the project but also a significant personal achievement for each one of us.

We're proud of how we came together as a team, pooling our diverse skills and learning from each other. This collaborative spirit was key in overcoming the challenges we faced and was instrumental in the successful completion of our project.


## What we learned

This weekend at the hackathon was an intense learning experience, vastly outstripping the knowledge we usually acquire over several weeks. Each one of us dived headfirst into uncharted waters, working with frameworks and technologies we hadn't touched before. This leap into the unknown was not just a test of our technical skills but also a testament to our willingness to push the envelope. The process of becoming the 'team expert' in something new was quite special, creating a unique synergy within our group.

We ventured into the realms of Django for setting up the backend and mastered the intricacies of integrating a Node.js front end. As if that wasn't challenging enough, we took on the task of interfacing with not one, but two third-party APIs. Seamlessly blending Google Cloud voice services with Cohere's natural language processing was like conducting a complex symphony where every note had to be in perfect harmony.

But the journey wasn't without its dark moments – those times when backend calls seemed to vanish into thin air and installations posed more questions than answers. It was in these moments of trial that we truly embodied the spirit of our project, asking ourselves, "Why not 100%?" 


## What's next for "Why not 100%?"

So what's next for "Why not 100%?"! We're gearing up to take customization to a whole new level. Picture this: AI-powered image generation that can recreate your childhood kitchen or study room, truly immersing you in the study environment of your childhood. And that's just the start. We would like to inject even more personalization into the parental figure, allowing users to tweak and tailor it until it almost feels like their real parent is there, guiding them. To further connect with the user, we could use neural language processing to display a more diverse range of emotions on the parent that adapts to the tone of what they are saying. 

On top of that, we're aiming to broaden the types of content the app can process. Imagine being able to upload your lecture notes for added context, or better yet, having a live connection to your camera. This means you could snap timestamped photos during lectures, which the app could then reference to help your virtual parent explain concepts more vividly.
