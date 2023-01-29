package ai.google;

import com.amazonaws.services.transcribe.model.GetTranscriptionJobResult;
import com.amazonaws.services.transcribe.model.StartTranscriptionJobResult;
import org.assertj.core.api.ThrowableAssert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TranscribeJobTest {


    static final String JOB_NAME = "ENTER UNIQUE JOB NAME, e.g. jkowalski01";

    static final String MEDIA_URL = "s3://ug2223/assets/Valerie_Beral_in_The_Life_Scientific_b01qdw1k.flac.mp3";

    @Test
    void shouldStartTranscriptionJob() {

        // given
        TranscribeJob underTest = new TranscribeJob();

        // when
        StartTranscriptionJobResult result = underTest.runTranscribeJob(MEDIA_URL, JOB_NAME);

        // then
        assertThat(result.getTranscriptionJob().getTranscriptionJobName()).isEqualTo(JOB_NAME);
    }

    @Test
    void shouldTranscriptionJobBeComplete() {

        // given
        TranscribeJob underTest = new TranscribeJob();

        // when
        GetTranscriptionJobResult result = underTest.checkJobStatus(JOB_NAME);

        // then
        assertThat(result.getTranscriptionJob().getTranscriptionJobStatus()).isEqualToIgnoringCase("COMPLETED");
        assertThat(result.getTranscriptionJob().getLanguageCode()).containsIgnoringCase("en-GB");
        assertThat(result.getTranscriptionJob().getMediaFormat()).isEqualTo("mp3");
    }

    @Test
    void shouldGetTranscriptIfJobCompleted() {

        // given
        TranscribeJob underTest = new TranscribeJob();

        // when
        Optional<String> result = underTest.getTranscript(JOB_NAME);

        // then
        assertThat(result).isNotEmpty();
        assertThat(result.get())
                .containsIgnoringCase("last people to get a desktop computer")
                .containsIgnoringCase("I would never do anything else")
                .containsIgnoringCase("I would keep on looking")
                .containsIgnoringCase("other people who can do that");
    }

    @ParameterizedTest
    @NullSource
    @EmptySource
    void shouldRejectInvalidOutputKey(String jobName) {

        // given
        ThrowableAssert.ThrowingCallable callable = () -> TranscribeJob.getOutputKey(jobName);

        // when
        assertThatThrownBy(callable).hasMessageContaining("Job name cannot be empty");
    }
}
