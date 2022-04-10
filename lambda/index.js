/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require('axios');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello and Welcome, I am virtual version of Mr.Inzamam Malik. what would you like to ask? I can tell you his name and work experiance.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'nameIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'My name is Muhammad Inzamam Malik, my friends call me Malik, would you like to know about my work experiance?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('to know my work experiance say. what is your work experiance')
            .getResponse();
    }
};

const workExpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'workExperiance';
    },
    handle(handlerInput) {
        const speakOutput = `I started working on web technologies in 2012,
        later on moved to Ai Chatbots and voice apps in late 2015. 
        these days I am one of the experts in voice apps.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('I am waiting for your response my friend, you can ask me my name')
            .getResponse();
    }
};


const weatherIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'weatherIntent';
    },
    async handle(handlerInput) {
        
         const slots = handlerInput.requestEnvelope.request.intent.slots;
         console.log("slots: ", slots);
         
         const cityName = slots.cityName;
         console.log("cityName: ", cityName);
         
        try{
    
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=5f50d76cd06943d099f160402221902&q=${cityName.value}&aqi=no`)
            console.log("data1", response.data);
            console.log("data2", response.data.current.condition.text);
            console.log("data3", response.data.current.temp_c);
            
            const speakOutput = `In ${cityName.value} it is ${response.data.current.temp_c} degree centigrade and ${response.data.current.condition.text}`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                // .reprompt('to know my work experiance say. what is your work experiance')
                .getResponse();
        }
        catch(error) {
            console.log(error);
            return handlerInput.responseBuilder
                .speak("something went wrong in function")
                // .reprompt('to know my work experiance say. what is your work experiance')
                .getResponse();
        }
                
            
              
    }
};


const bookRoomIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'bookRoom';
    },
    handle(handlerInput) {
        
        
         const slots = handlerInput.requestEnvelope.request.intent.slots;
         console.log("slots: ", slots);
         
         const numberOfPeople = slots.numberOfPeople;
         console.log("numberOfPeople: ", numberOfPeople);
        
         const roomType = slots.roomType;
         console.log("roomType: ", roomType);
         
         const arrivalDate = slots.arrivalDate;
         console.log("arrivalDate: ", arrivalDate);
         
         const Duration = slots.Duration;
         console.log("Duration: ", Duration);
         
         
         

        
        
        
        const speakOutput = `your hotel booking is completed`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('I am waiting for your response my friend, you can ask me my name')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        bookRoomIntentHandler,
        weatherIntentHandler,
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        workExpIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();