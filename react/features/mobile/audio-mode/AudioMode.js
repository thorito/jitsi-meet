import { NativeModules, NativeEventEmitter } from 'react-native';

/**
 * TODO.
 */
let AudioMode = NativeModules.AudioMode;

// XXX Rather than wrapping AudioMode in a new class and forwarding the many
// methods of the latter to the former, add the one additional method that we
// need to RNCallKit.
if (AudioMode) {
    const eventEmitter = new NativeEventEmitter(AudioMode);

    AudioMode = {
        ...AudioMode,
        addListener: eventEmitter.addListener.bind(eventEmitter)
    };
}

export default AudioMode;
