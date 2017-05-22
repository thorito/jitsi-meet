package org.jitsi.meet;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import org.jitsi.jitsikit.*;


public class MainActivity extends AppCompatActivity {
    private JitsiConference conference;
    public static final int OVERLAY_PERMISSION_REQ_CODE = 4242;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        /**
         * Create the single <tt>JitsiConference</tt> instance we need. By passing null as the
         * initial URL the welcome page will be rendered.
         *
         * Override default background color with one that is in accord with the JavaScript and
         * iOS parts of the application and causes less perceived visual flicker than the default
         * background color.
         */
        conference = JitsiMeet.getInstance().conferenceForURL(/* initial URL  */ null, this);
        conference.getView().setBackgroundColor(0xFF111111);

        /**
         * In debug mode React needs permission to write over other apps in order to display the
         * warning and error overlays.
         */
        if (BuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
            !Settings.canDrawOverlays(this)) {

            Intent intent
                = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
            return;
        }

        setContentView(conference.getView());
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(this)) {
                    // Permission not granted...
                    return;
                }
            }

            setContentView(conference.getView());
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        JitsiMeet.getInstance().onHostPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JitsiMeet.getInstance().onHostResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        JitsiMeet.getInstance().onHostDestroy(this);
    }

    @Override
    public void onBackPressed() {
        if (!JitsiMeet.getInstance().onBackPressed()) {
            // Invoke the default handler if it wasn't handled by React.
            super.onBackPressed();
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        JitsiMeet.getInstance().onNewIntent(intent);
    }
}
