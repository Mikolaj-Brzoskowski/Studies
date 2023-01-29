import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.Objects;

class DeepLTranslator {

    static final MediaType APPLICATION_JSON = MediaType.parse("application/x-www-form-urlencoded");
    static final String TRANSLATOR_BASE_URL = "https://api.deepl.com/v2/translate";
    static final String DEEPL_KEY = Objects.requireNonNull(
            System.getenv("DEEPL_KEY"),
            "Set DEEPL_KEY environment variable"
    );

    final String sourceLang;

    public DeepLTranslator(String sourceLang) {
        this.sourceLang = sourceLang;
    }

    // Instantiates the OkHttpClient.
    OkHttpClient client = new OkHttpClient();

    // This function performs a POST request.
    String translate(String input, String targetLang) {

        HttpUrl url = buildUrl(targetLang);
        RequestBody body = buildRequestBody(input);
        Request request = buildRequest(body, url);

        try (Response response = client.newCall(request).execute()) {
            return formatResponse(response);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @NotNull
    private static HttpUrl buildUrl(String targetLang) {
        return new HttpUrl.Builder()
                .scheme("https")
                .host(TRANSLATOR_BASE_URL)
                .addPathSegments("translate")
                .addQueryParameter("api-version", "3.0")
                .addQueryParameter("from", sourceLang)
                .addQueryParameter("to", targetLang)
                .addQueryParameter("to", "zh")
                .addQueryParameter("to", "uk")
                .addQueryParameter("to", "ar")
                .build();
    }

    @NotNull
    private static RequestBody buildRequestBody(String text) {
        return RequestBody.create("""
                [
                    {
                        "Text": "$text"
                    }
                ]""".replace("$text", text), APPLICATION_JSON);
    }

    @NotNull
    private static Request buildRequest(RequestBody body, HttpUrl url) {
        return new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("auth_key", DEEPL_KEY)
                .addHeader("Content-Type", "application/json")
                .build();
    }

    @NotNull
    private static String formatResponse(Response response) throws IOException {
        ResponseBody responseBody = Objects.requireNonNull(response.body());
        String responseString = responseBody.string();
        if (Objects.requireNonNull(response.header("Content-Type")).contains("json")) {
            return prettify(responseString);
        }
        return responseString;
    }

    static String prettify(String jsonText) {
        JsonElement json = JsonParser.parseString(jsonText);
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(json);
    }

}