package org.jitsi.jitsikit;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;

import java.net.URL;


public class JitsiMeet {
    private static JitsiMeet mInstance;
    private ReactInstanceManager mReactInstanceManager;

    public static JitsiMeet getInstance() {
        if (mInstance == null) {
            mInstance = new JitsiMeet();
        }

        return mInstance;
    }

    private JitsiMeet() {
    }

    private void initReactInstanceManager(Application application) {
        mReactInstanceManager = ReactInstanceManager.builder()
            .setApplication(application)
            .setBundleAssetName("index.android.bundle")
            .setJSMainModuleName("index.android")
            .addPackage(new com.corbt.keepawake.KCKeepAwakePackage())
            .addPackage(new com.facebook.react.shell.MainReactPackage())
            .addPackage(new com.oblador.vectoricons.VectorIconsPackage())
            .addPackage(new com.ocetnik.timer.BackgroundTimerPackage())
            .addPackage(new com.oney.WebRTCModule.WebRTCModulePackage())
            .addPackage(new com.rnimmersive.RNImmersivePackage())
            .addPackage(new org.jitsi.jitsikit.audiomode.AudioModePackage())
            .addPackage(new org.jitsi.jitsikit.proximity.ProximityPackage())
            .setUseDeveloperSupport(BuildConfig.DEBUG)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build();
    }

    public JitsiConference conferenceForURL(URL url, Activity activity) {
        if (mReactInstanceManager == null) {
            initReactInstanceManager(activity.getApplication());
        }

        ReactRootView reactRootView = new ReactRootView(activity);
        Bundle initialProps = new Bundle();

        if (url != null) {
            initialProps.putString("url", url.toString());
        }

        reactRootView.startReactApplication(mReactInstanceManager, "App", initialProps);

        return new JitsiConference(reactRootView);
    }

    public void onHostPause(Activity activity) {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(activity);
        }
    }

    public void onHostResume(Activity activity) {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(activity, null);
        }
    }

    public void onHostDestroy(Activity activity) {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(activity);
        }
    }

    public boolean onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
            return true;
        } else {
            return false;
        }
    }

    public void onNewIntent(Intent intent) {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onNewIntent(intent);
        }
    }
}
