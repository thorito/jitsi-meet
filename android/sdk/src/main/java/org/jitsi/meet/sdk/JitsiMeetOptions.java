package org.jitsi.meet.sdk;

import android.os.*;

import java.util.*;

public class JitsiMeetOptions {
    private final static String PROP_AUDIO_ONLY = "audioOnly";

    private final static String PROP_AUDIO_MUTED = "audioMuted";

    private final static String PROP_SERVER_URL = "serverURL";

    private final static String PROP_PICTURE_IN_PICTURE_ENABLED
        = "pictureInPictureEnabled";

    private final static String PROP_ROOM = "room";

    private final static String PROP_VIDEO_MUTED = "videoMuted";

    private final static String PROP_WELCOME_PAGE_ENABLED
        = "welcomePageEnabled";

    private final Bundle bundle;

    public JitsiMeetOptions() {
        this((Bundle) null);
    }

    public JitsiMeetOptions(JitsiMeetOptions defaultOptions) {
        this(defaultOptions != null ? defaultOptions.bundle : null);
    }

    private JitsiMeetOptions(Bundle defaults) {
        this.bundle = new Bundle();

        if (defaults != null) {
            this.bundle.putAll(defaults);
        }
    }

    public Boolean getAudioMuted() {
        return bundle.getBoolean(PROP_AUDIO_MUTED);
    }

    public Boolean getAudioOnly() {
        return bundle.getBoolean(PROP_AUDIO_ONLY);
    }

    public String getRoom() {
        return bundle.getString(PROP_ROOM);
    }

    public String getServerURL() {
        return bundle.getString(PROP_SERVER_URL);
    }

    public Boolean getVideoMuted() {
        return bundle.getBoolean(PROP_VIDEO_MUTED);
    }

    public Boolean isPictureInPictureEnabled() {
        return bundle.getBoolean(PROP_PICTURE_IN_PICTURE_ENABLED, true);
    }

    public boolean isWelcomePageEnabled() {
        return bundle.getBoolean(PROP_WELCOME_PAGE_ENABLED, false);
    }

    public JitsiMeetOptions setAudioMuted(Boolean audioMuted) {
        return setBoolean(PROP_AUDIO_MUTED, audioMuted);
    }

    public JitsiMeetOptions setAudioOnly(Boolean audioOnly) {
        return setBoolean(PROP_AUDIO_ONLY, audioOnly);
    }

    protected JitsiMeetOptions setBoolean(String propertyName, Boolean value) {
        if (value != null) {
            bundle.putBoolean(propertyName, value);
        } else {
            bundle.remove(propertyName);
        }

        return this;
    }

    public JitsiMeetOptions setServerURL(String serverURL) {
        return setString(PROP_SERVER_URL, serverURL);
    }

    protected JitsiMeetOptions setString(String propertyName, String value) {
        if (value != null) {
            bundle.putString(propertyName, value);
        } else {
            bundle.remove(propertyName);
        }

        return this;
    }

    public JitsiMeetOptions setPictureInPictureEnabled(Boolean pictureInPictureEnabled) {
        return setBoolean(
                PROP_PICTURE_IN_PICTURE_ENABLED,
                pictureInPictureEnabled);
    }

    public JitsiMeetOptions setRoom(String room) {
        return setString(PROP_ROOM, room);
    }

    public JitsiMeetOptions setVideoMuted(Boolean videoMuted) {
        return setBoolean(PROP_VIDEO_MUTED, videoMuted);
    }

    public JitsiMeetOptions setWelcomePageEnabled(boolean isWelcomePageEnabled) {
        return setBoolean(PROP_WELCOME_PAGE_ENABLED, isWelcomePageEnabled);
    }

    Bundle toProps() {
        Bundle props = new Bundle();

        // serverURL
        if (getServerURL() != null) {
            props.putString("defaultURL", getServerURL());
        }

        // pictureInPictureEnabled
        props.putBoolean(
                "pictureInPictureEnabled",
                isPictureInPictureEnabled());

        // welcomePageEnabled
        props.putBoolean("welcomePageEnabled", isWelcomePageEnabled());

        // The url bundle section
        // FIXME The url bundle thing feels weird
        Bundle urlBundle = new Bundle();

        String url = Objects.requireNonNull(getServerURL(), "serverURL");
        String room = getRoom();

        if (room != null) {
            // FIXME do relativeToURL on server URL
            url += "/" + room;
        }

        urlBundle.putString("url", url);

        // FIXME check if null checks are necessary ?
        if (getAudioMuted() != null) {
            urlBundle.putBoolean("startWithAudioMuted", getAudioMuted());
        }
        if (getAudioOnly() != null) {
            urlBundle.putBoolean("startAudioOnly", getAudioOnly());
        }
        if (getVideoMuted() != null) {
            urlBundle.putBoolean("startWithVideoMuted", getVideoMuted());
        }

        props.putBundle("url", urlBundle);

        return props;
    }
}
