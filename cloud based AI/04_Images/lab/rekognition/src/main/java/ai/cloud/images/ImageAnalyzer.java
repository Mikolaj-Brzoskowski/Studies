package ai.cloud.images;

import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;
import software.amazon.awssdk.services.rekognition.model.S3Object;

class ImageAnalyzer {

    private final Region region;
    private final String myBucket;

    ImageAnalyzer(Region region, String myBucket) {
        this.region = region;
        this.myBucket = myBucket;
    }

    PeopleStats analyze(String imageName) {
        try (RekognitionClient rekClient = RekognitionClient.builder()
                .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
                .region(region)
                .build()) {
            return analyzeWithClient(rekClient, imageName);
        }
    }

    private PeopleStats analyzeWithClient(RekognitionClient rekClient, String imageName) {
        S3Object s3object = S3Object.builder()
                .bucket(myBucket)
                .name(imageName)
                .build();

        Image image = Image.builder()
                .s3Object(s3object)
                .build();

        DetectFacesRequest request = DetectFacesRequest.builder()
                .attributes(Attribute.ALL)
                .image(image)
                .build();

        DetectFacesResponse response = rekClient.detectFaces(request);

        long smiling = response.faceDetails()
                .stream()
                .map(FaceDetail::smile)
                .filter(smile -> smile.value() && smile.confidence() >= 80f)
                .count();

        int facesDetected = response.faceDetails().size();

        return new PeopleStats(facesDetected, smiling);
    }


}
