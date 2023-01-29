package ai.cloud;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.nio.file.Path;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

class AzureAnomalyDetectionTest {

    @ParameterizedTest
    @MethodSource("createParams")
    @DisplayName("Should return expected number of anomalies for the given sensitivity (dataset: inflation, 5y)")
    void shouldReturnExpectedNumberOfAnomaliesForInflation(int sensitivity, int expectedNumberOfAnomalies) {
        // given
        AzureAnomalyDetection underTest = new AzureAnomalyDetection();

        // when
        AzureAnomalyDetection.DetectionResult result = underTest.runDetection(Path.of("src/test/resources/multiTimeline.csv"), sensitivity);
        long numberOfAnomalies = result.isAnomaly.stream().filter(Boolean.TRUE::equals).count();

        // then
        assertThat(numberOfAnomalies).isEqualTo(expectedNumberOfAnomalies);
    }

    static Stream<Arguments> createParams() {
        return Stream.of(
            Arguments.of(70, 31),
            Arguments.of(90, 62)
        );
    }
}
