package ai.cloud;

import com.google.cloud.texttospeech.v1beta1.*;
import com.google.protobuf.ByteString;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GcpTts {

    public void textToSpeech() throws IOException {
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
            SynthesisInput input = SynthesisInput.newBuilder().setText("What is it like to be a scribe? Is it good? In my opinion it's not about being good or not good. " +
                    "If I were to say what I esteem the most in life, I would say - people. People, who gave me a helping hand when I was a mess, when I was alone. " +
                    "And what's interesting, the chance meetings are the ones that influence our lives. The point is that when you profess certain values, even those seemingly universal, " +
                    "you may not find any understanding which, let me say, which helps us to develop. I had luck, let me say, because I found it. And I'd like to thank life. " +
                    "I'd like to thank it - life is singing, life is dancing, life is love. Many people ask me the same question, but how do you do that? where does all your " +
                    "happiness come from? And i replay that it's easy, it's cherishing live, that's what makes me build machines today, and tomorrow... who knows, " +
                    "why not, i would dedicate myself to do some community working and i would be, wham, not least... planting .... i mean... carrots.\n").build();

            VoiceSelectionParams voice = getVoiceSelectionParams();

            AudioConfig audioConfig =
                    AudioConfig.newBuilder()
                            .setAudioEncoding(AudioEncoding.MP3)
                            .build();


            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            ByteString audioContents = response.getAudioContent();

            toFile(audioContents);
        }
    }

    public void ssmlToSpeech() throws IOException {
        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
            SynthesisInput input = SynthesisInput.newBuilder().setSsml(getSsml()).build();

            VoiceSelectionParams voice = getVoiceSelectionParams();

            AudioConfig audioConfig =
                    AudioConfig.newBuilder()
                            .setAudioEncoding(AudioEncoding.MP3)
                            .build();

            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);

            ByteString audioContents = response.getAudioContent();

            toFileSSML(audioContents);
        }
    }
    
    private static String getSsml() throws IOException {
        return Files.readString(Paths.get("src/test/resources/input.ssml"));
    }

    private static void toFile(ByteString audioContents) throws IOException {
        try (OutputStream out = new FileOutputStream("build/output.mp3")) {
            out.write(audioContents.toByteArray());
        }
    }

    private static void toFileSSML(ByteString audioContents) throws IOException {
        try (OutputStream out = new FileOutputStream("build/outputSSML.mp3")) {
            out.write(audioContents.toByteArray());
        }
    }

    private static VoiceSelectionParams getVoiceSelectionParams() {
        return VoiceSelectionParams.newBuilder()
                .setLanguageCode("en-US")
                .setSsmlGender(SsmlVoiceGender.FEMALE)
                .build();
    }

}
