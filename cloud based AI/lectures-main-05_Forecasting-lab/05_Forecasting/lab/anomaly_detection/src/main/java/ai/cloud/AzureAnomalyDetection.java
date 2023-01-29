package ai.cloud;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVParser;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.*;

public class AzureAnomalyDetection {

    /**
     * This value can be found in the Keys & Endpoint section when examining your resource from the Azure portal.
     * Example endpoint: https://YOUR_RESOURCE_NAME.cognitiveservices.azure.com/
     */
    private final String ANOMALY_DETECTOR_ENDPOINT;

    /**
     * The API key value can be found in the Keys & Endpoint section when examining your resource from the Azure portal.
     * You can use either KEY1 or KEY2
     */
    private final String ANOMALY_DETECTOR_API_KEY;
    private final ObjectMapper objectMapper;

    public AzureAnomalyDetection() {
        ANOMALY_DETECTOR_ENDPOINT = Objects.requireNonNull(
                System.getenv("ANOMALY_DETECTOR_ENDPOINT"),
                "Missing environment variable ANOMALY_DETECTOR_ENDPOINT"
        );
        ANOMALY_DETECTOR_API_KEY = Objects.requireNonNull(
                System.getenv("ANOMALY_DETECTOR_API_KEY"),
                "Missing environment variable ANOMALY_DETECTOR_API_KEY"
        );
        objectMapper = new ObjectMapper();
    }

    public DetectionResult runDetection(Path dataPath, int sensitivity)  {

        try {
            var series = parseCSVSeries(dataPath);
            String jsonData = prepareJsonData(series, sensitivity);
            Response response = getResponse(jsonData);
            String responseContents = response.body().string();
            return deserializeResponse(responseContents);
        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }
    }

    private DetectionResult deserializeResponse(String responseContents) throws IOException {
        return objectMapper.reader(DetectionResult.class).readValue(responseContents);
    }

    /**
     * For all accepted map keys see:
     * <a href="https://westus2.dev.cognitive.microsoft.com/docs/services/AnomalyDetector/operations/post-timeseries-entire-detect">...</a>
     *
     * @return JSON serialized request body to Anomaly Detection
     * @param series data series (from parsed CSV)
     * @param sensitivity anomaly detection sensitivity from range 1-99
     * @throws JsonProcessingException if writing the Java object to JSON fails
     */
    private String prepareJsonData(List<Map<String, Object>> series, Integer sensitivity) throws JsonProcessingException {
        Map<String, Object> requestBodyMap = Map.of(
                "series", series,
                "maxAnomalyRatio", 0.25,
                "sensitivity", sensitivity
        );
        return objectMapper.writer().writeValueAsString(requestBodyMap);
    }

    /**
     * @param dataPath path to CSV data file
     * @return list of data "tuples" (in plain Java represented as {@code Map<String, Object>})
     * @throws IOException if accessing CSV data file fails
     * @throws CsvException if parsing CSV data file fails
     */
    private List<Map<String, Object>> parseCSVSeries(Path dataPath) throws IOException, CsvException {
        CSVReader reader = new CSVReaderBuilder(new FileReader(dataPath.toFile()))
                .withSkipLines(1)
                .build();
        List<String[]> values = reader.readAll();
        DataObjectFactory factory = new DataObjectFactory("timestamp", "value");
        List<Map<String, Object>> series = new ArrayList<>();
        for (String[] value : values) {
            Map<String, Object> object = new HashMap<>();
            object.put(factory.xLabel(), value[0]);
            object.put(factory.yLabel(), value[1]);
            series.add(object);
        }
        return series;
    }

    /**
     * Equivalent of cURL
     * <pre>
     * curl -v POST "%ANOMALY_DETECTOR_ENDPOINT%/anomalydetector/v1.0/timeseries/entire/detect"
     * -H "Content-Type: application/json"
     * -H "Ocp-Apim-Subscription-Key: %ANOMALY_DETECTOR_API_KEY%"
     * -d "@path_to_sample_file.json"
     * </pre>
     *
     * @param data CSV data
     * @return OkHttp {@link Response}
     */
    @NotNull
    private Response getResponse(String data) {
        OkHttpClient client = new OkHttpClient.Builder().build();

        RequestBody body = RequestBody.create(data, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url(ANOMALY_DETECTOR_ENDPOINT + "anomalydetector/v1.0/timeseries/entire/detect")
                .header("Content-Type", "application/json")
                .header("Ocp-Apim-Subscription-Key", ANOMALY_DETECTOR_API_KEY)
                .post(body)
                .build();

        try {
            return client.newCall(request).execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private record DataObjectFactory(String xLabel, String yLabel) {

        Map<String, Object> build(String xValue, String yValue) {
            return Map.of(xLabel, xValue, yLabel, yValue);
        }
    }

    static class DetectionResult {
        @JsonProperty("expectedValues")
        List<Double> expectedValues;
        @JsonProperty("isAnomaly")
        List<Boolean> isAnomaly;
        @JsonProperty("isNegativeAnomaly")
        List<Boolean> isNegativeAnomaly;
        @JsonProperty("isPositiveAnomaly")
        List<Boolean> isPositiveAnomaly;
        @JsonProperty("lowerMargins")
        List<Double> lowerMargins;
        @JsonProperty("upperMargins")
        List<Double> upperMargins;
        @JsonProperty("period")
        Integer period;

        DetectionResult() {
            // default constructor for Jackson
        }
    }
}