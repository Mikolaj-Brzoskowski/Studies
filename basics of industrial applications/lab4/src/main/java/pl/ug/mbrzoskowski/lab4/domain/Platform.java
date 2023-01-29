package pl.ug.mbrzoskowski.lab4.domain;

public enum Platform {
    PC("PC"),
    PS5("PS5"),
    XBOX("Xbox"),
    SWITCH("Switch"),
    ANDROID("Android"),
    IOS("iOS");

    private String platform;
    private Platform(String platform) {
        this.platform = platform;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}
