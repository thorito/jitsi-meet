/* global $ */

import VideoLayout from "../videolayout/VideoLayout";
import LargeContainer from '../videolayout/LargeContainer';
import UIEvents from "../../../service/UI/UIEvents";
import Filmstrip from '../videolayout/Filmstrip';


/**
 * Default shared URL frame width.
 */
const DEFAULT_WIDTH = 640;
/**
 * Default shared URL frame height.
 */
const DEFAULT_HEIGHT = 480;

const SHARED_URL_CONTAINER_TYPE = "sharedUrl";

/**
 * Container for shared URL iframe.
 */
class SharedUrl extends LargeContainer {

    constructor (url) {
        super();

        this.iframe = null;
        this.window = null;

        const iframe = document.createElement('iframe');

        iframe.id = 'sharedUrlIFrame';
        iframe.src = url;
        iframe.frameBorder = 0;
        iframe.scrolling = 'no';
        iframe.width = DEFAULT_WIDTH;
        iframe.height = DEFAULT_HEIGHT;
        iframe.setAttribute('style', 'visibility: hidden;');

        iframe.onload = (evt) => {
            console.log('XXXXX');
            console.log(evt);
        };

        iframe.onerror = (evt) => {
            console.log('YYYYY');
            console.log(evt);
        };


        this.container.appendChild(iframe);
        this.iframe = iframe;
    }

    get isOpen () {
        return Boolean(this.iframe);
    }

    get container () {
        return document.getElementById(SHARED_URL_CONTAINER_TYPE);
    }

    // eslint-disable-next-line no-unused-vars
    resize (containerWidth, containerHeight, animate) {
        const height = containerHeight - Filmstrip.getFilmstripHeight();
        const width = containerWidth;

        $(this.iframe).width(width).height(height);
    }

    show () {
        const $iframe = $(this.iframe);
        const $container = $(this.container);
        let self = this;

        return new Promise(resolve => {
            $iframe.fadeIn(300, function () {
                self.bodyBackground = document.body.style.background;
                document.body.style.background = '#eeeeee';
                $iframe.css({visibility: 'visible'});
                $container.css({zIndex: 2});
                resolve();
            });
        });
    }

    hide () {
        const $iframe = $(this.iframe);
        const $container = $(this.container);
        document.body.style.background = this.bodyBackground;

        return new Promise(resolve => {
            $iframe.fadeOut(300, function () {
                $iframe.css({visibility: 'hidden'});
                $container.css({zIndex: 0});
                resolve();
            });
        });
    }

    /**
     * @return {boolean} do not switch on dominant speaker even if on stage.
     */
    stayOnStage () {
        return true;
    }
}

/**
 * Manager of the shared URL frame.
 */
export default class SharedUrlManager {
    constructor (url, eventEmitter) {
        if (!url) {
            throw new Error('missing URL');
        }

        this.url = url;
        this.eventEmitter = eventEmitter;
        this.sharedUrl = null;
    }

    get isOpen () {
        return Boolean(this.sharedUrl);
    }

    isVisible() {
        return VideoLayout.isLargeContainerTypeVisible(SHARED_URL_CONTAINER_TYPE);
    }

    /**
     * Create new shared URL frame.
     */
    openSharedUrl () {
        this.sharedUrl = new SharedUrl(this.url);
        VideoLayout.addLargeVideoContainer(
            SHARED_URL_CONTAINER_TYPE,
            this.sharedUrl
        );
    }

    /**
     * Toggle shared URL frame visibility.
     * Open new shared URL frame if there is no frame yet.
     */
    toggleSharedUrl () {
        if (!this.isOpen) {
            this.openSharedUrl();
        }

        const isVisible = this.isVisible();

        VideoLayout.showLargeVideoContainer(
            SHARED_URL_CONTAINER_TYPE, !isVisible);

        this.eventEmitter
            .emit(UIEvents.TOGGLED_SHARED_URL, !isVisible);
    }
}
