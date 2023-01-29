package ai.google;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.transcribe.AmazonTranscribe;
import com.amazonaws.services.transcribe.AmazonTranscribeClient;
import com.amazonaws.services.transcribe.model.GetTranscriptionJobResult;
import com.amazonaws.services.transcribe.model.StartTranscriptionJobResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class TranscribeJob {

    private static final Logger LOGGER = LoggerFactory.getLogger(TranscribeJob.class);
    private static final Regions REGION = Regions.EU_WEST_3;
    public static final String BUCKET_NAME = "ug2223";

    public StartTranscriptionJobResult runTranscribeJob(String s3Source, String jobName) {
        AmazonTranscribe getAmazonTranscribe();
        return null;
    }

    public GetTranscriptionJobResult checkJobStatus(String jobName) {
        // TODO implement me
        return null;
    }

    static String getOutputKey(String jobName) {
        return Optional.ofNullable(jobName)
                .filter(name -> name.length() > 0)
                .map(name -> name + "/output.json")
                .orElseThrow(() -> new IllegalArgumentException("Job name cannot be empty"));
    }

    public Optional<String> getTranscript(String jobName) {
        // TODO implement me
        return Optional.empty();
    }

    private AWSCredentialsProvider getCredentialsProvider() {
        AWSCredentialsProvider awsCredentials = DefaultAWSCredentialsProviderChain.getInstance();
        return new AWSStaticCredentialsProvider(awsCredentials.getCredentials());
    }

    private AmazonTranscribe getAmazonTranscribe() {

        return AmazonTranscribeClient.builder()
                .withRegion(REGION)
                .withCredentials(getCredentialsProvider())
                .build();
    }

    private AmazonS3 getAmazonS3() {

        return AmazonS3Client.builder()
                .withRegion(REGION)
                .withCredentials(getCredentialsProvider())
                .build();
    }
}
