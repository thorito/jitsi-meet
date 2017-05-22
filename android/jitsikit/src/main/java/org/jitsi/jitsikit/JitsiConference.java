package org.jitsi.jitsikit;


import android.view.View;

import com.facebook.react.ReactRootView;


public class JitsiConference {
    private ReactRootView mReactRootView;

    protected JitsiConference(ReactRootView rootView) {
        mReactRootView = rootView;
    }

    public View getView() {
        return mReactRootView;
    }
}
