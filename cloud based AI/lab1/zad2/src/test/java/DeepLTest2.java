import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DeepLTest {

    DeepLTranslator underTest = new DeepLTranslator("pl");

    @Test
    @DisplayName("Should translate sample sentence from English to Polish")
    void shouldTranslateMickiewiczSentenceToPolish() {

        String command = "curl -L https://wolnelektury.pl/api/authors/adam-mickiewicz";
        Process process = Runtime.getRuntime().exec(command);
        InputStream inputStream = process.getInputStream();
        String text = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        // when
        String output = underTest.translate(text, "en");

        // then
        assertThat(output).contains("poet ", "Paris");
    }

}