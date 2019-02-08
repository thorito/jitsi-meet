/*
 * Copyright @ 2019-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import <React/RCTUtils.h>

#import "JitsiMeetConferenceOptions+Private.h"

@implementation JitsiMeetConferenceOptionsBuilder {
    NSNumber *_audioOnly;
    NSNumber *_audioMuted;
    NSNumber *_videoMuted;
    NSNumber *_welcomePageEnabled;
}

@dynamic audioOnly;
@dynamic audioMuted;
@dynamic videoMuted;
@dynamic welcomePageEnabled;

- (instancetype)init {
    if (self = [super init]) {
        _serverURL = nil;
        _room = nil;

        _colorScheme = nil;

        _audioOnly = nil;
        _audioMuted = nil;
        _videoMuted = nil;

        _welcomePageEnabled = nil;
    }
    
    return self;
}

#pragma mark - Dynamic properties

- (void)setAudioOnly:(BOOL)audioOnly {
    _audioOnly = [NSNumber numberWithBool:audioOnly];
}

- (BOOL)audioOnly {
    return _audioOnly && [_audioOnly boolValue];
}

- (void)setAudioMuted:(BOOL)audioMuted {
    _audioMuted = [NSNumber numberWithBool:audioMuted];
}

- (BOOL)audioMuted {
    return _audioMuted && [_audioMuted boolValue];
}

- (void)setVideoMuted:(BOOL)videoMuted {
    _videoMuted = [NSNumber numberWithBool:videoMuted];
}

- (BOOL)videoMuted {
    return _videoMuted && [_videoMuted boolValue];
}

- (void)setWelcomePageEnabled:(BOOL)welcomePageEnabled {
    _welcomePageEnabled = [NSNumber numberWithBool:welcomePageEnabled];
}

- (BOOL)welcomePageEnabled {
    return _welcomePageEnabled && [_welcomePageEnabled boolValue];
}

#pragma mark - Private API

- (NSNumber *)getAudioOnly {
    return _audioOnly;
}

- (NSNumber *)getAudioMuted {
    return _audioMuted;
}

- (NSNumber *)getVideoMuted {
    return _videoMuted;
}

- (NSNumber *)getWelcomePageEnabled {
    return _welcomePageEnabled;
}

@end

@implementation JitsiMeetConferenceOptions {
    NSNumber *_audioOnly;
    NSNumber *_audioMuted;
    NSNumber *_videoMuted;
    NSNumber *_welcomePageEnabled;
}

@dynamic audioOnly;
@dynamic audioMuted;
@dynamic videoMuted;
@dynamic welcomePageEnabled;

#pragma mark - Dynamic properties

- (BOOL)audioOnly {
    return _audioOnly && [_audioOnly boolValue];
}

- (BOOL)audioMuted {
    return _audioMuted && [_audioMuted boolValue];
}

- (BOOL)videoMuted {
    return _videoMuted && [_videoMuted boolValue];
}

- (BOOL)welcomePageEnabled {
    return _welcomePageEnabled && [_welcomePageEnabled boolValue];
}

#pragma mark - Internal initializer

- (instancetype)initWithBuilder:(JitsiMeetConferenceOptionsBuilder *)builder {
    if (self = [super init]) {
        _serverURL = builder.serverURL;
        _room = builder.room;

        _colorScheme = builder.colorScheme;

        _audioOnly = [builder getAudioOnly];
        _audioMuted = [builder getAudioMuted];
        _videoMuted = [builder getVideoMuted];

        _welcomePageEnabled = [builder getWelcomePageEnabled];
    }

    return self;
}

#pragma mark - API

+ (instancetype)fromBuilder:(void (^)(JitsiMeetConferenceOptionsBuilder *))initBlock {
    JitsiMeetConferenceOptionsBuilder *builder = [[JitsiMeetConferenceOptionsBuilder alloc] init];
    initBlock(builder);
    return [[JitsiMeetConferenceOptions alloc] initWithBuilder:builder];
}

#pragma mark - Private API

- (NSDictionary *)asProps {
    NSMutableDictionary *props = [[NSMutableDictionary alloc] init];

    NSString *serverURL = nil;
    if (self.serverURL != nil) {
         serverURL = [self.serverURL absoluteString];
    }
    props[@"serverURL"] = RCTNullIfNil(serverURL);

    if (_welcomePageEnabled != nil) {
        props[@"welcomePageEnabled"] = @(self.welcomePageEnabled);
    }

    props[@"colorScheme"] = RCTNullIfNil(self.colorScheme);

    NSString *url = nil;
    if (self.room != nil) {
        url = [[NSURL URLWithString:self.room relativeToURL:self.serverURL] absoluteString];
    }

    NSMutableDictionary *config = [[NSMutableDictionary alloc] init];
    if (_audioOnly != nil) {
        config[@"startAudioOnly"] = @(self.audioOnly);
    }
    if (_audioMuted != nil) {
        config[@"startWithAudioMuted"] = @(self.audioMuted);
    }
    if (_videoMuted != nil) {
        config[@"startWithVideoMuted"] = @(self.videoMuted);
    }

    props[@"url"] = @{ @"url" : RCTNullIfNil(url), @"config" : config };

    return props;
}

@end
