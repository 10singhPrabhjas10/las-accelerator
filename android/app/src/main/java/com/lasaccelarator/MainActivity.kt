package com.lasaccelarator

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)  // Show the splash screen before super.onCreate
        super.onCreate(savedInstanceState)
    }

    override fun getMainComponentName(): String {
        return "LASAccelarator"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        val fabricEnabled = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        return DefaultReactActivityDelegate(this, getMainComponentName(), fabricEnabled)
    }
}
