import { Component } from '@angular/core';

import { ActionSheetController, NavController, Page } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';


@Component({
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  speakers = [];

  constructor(
    private nav: NavController,
    private actionSheetCtrl: ActionSheetController,
    confData: ConferenceData
  ) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: string) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }

  openSpeakerShare(speaker) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
