import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DeepLTest {

    DeepLTranslator underTest = new DeepLTranslator("en");

    @Test
    @DisplayName("Should translate sample sentence from English to French")
    void shouldTranslateSampleSentenceToFrench() {
        // given
        String input = "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.";

        // when
        String output = underTest.translate(input, "fr");

        // then
        assertThat(output).contains("faiblesse", "toujours");
    }

    @Test
    @DisplayName("Should translate sample sentence from English to Polish")
    void shouldTranslateSampleSentenceToPolish() {
        // given
        String input = "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.";

        // when
        String output = underTest.translate(input, "pl");

        // then
        assertThat(output).contains("osiągnięcie", "próby");
    }

    @Test
    @DisplayName("Should translate sample sentence from English to Japanese")
    void shouldTranslateSampleSentenceToJapanese() {
        // given
        String input = "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.";

        // when
        String output = underTest.translate(input, "ja");

        // then
        assertThat(output).contains("あきらめることにある", "成功するための最も確実な方法は");
    }

}
