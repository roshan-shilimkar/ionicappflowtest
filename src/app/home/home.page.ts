import { Component } from '@angular/core';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { Toast } from '@capacitor/toast';
// import { Network } from '@capacitor/network';
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Capacitor, WebView } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  path: any;
  progress: any = 0;
  public current_status = ""
  interval: any;
  updateStatus: string = "";
  app_path: any;

  Moduleslist: Array<any> = [
    {
      "ModuleName": "HR Production Module",
      'APP_ID': 'Production',
    },
    // {
    //   "ModuleName": "Development",
    //   'APP_ID': 'development',
    // },
  ]

  constructor(
    private deploy: Deploy,
    private inAppBrowser: InAppBrowser
  ) { }

  // async checkinternet() {
  //   console.log(conntype)
  //   console.log( conntype && conntype !== 'unknown' && conntype !== 'none');
  // }

  async performManualUpdate() {
    this.updateStatus = 'Checking for Update';
    const update = await this.deploy.checkForUpdate()
    if (update.available) {
      this.updateStatus = 'Update found. Downloading update';
      await this.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      this.updateStatus = 'Update downloaded. Extracting update';
      await this.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      console.log('Reloading app');
      this.updateStatus = 'Update extracted. Reloading app';
      await this.deploy.reloadApp();
    } else {
      console.log('No update available');
      this.updateStatus = 'No update available';
    }
  }

  async openbrowser() {
    await Browser.open({ url: 'http://capacitorjs.com/' })
  }

  openbrowser1() {
    this.inAppBrowser.create('http://capacitorjs.com/');
  }

  async itemSelected(item: any) {
    console.log("item selected clicked", item);
    console.log("item selected clicked", item['APP_ID']);
    const versions = await this.deploy.getAvailableVersions();
    console.log("Versions ", versions);
    this.app_path = this.seekChannels(versions, item['APP_ID']);
    console.log(this.app_path);
    // WebView.getServerBasePath().then((data) => {
    //   console.log("webview path ==============", data);
    // })
    console.log("================");
    console.log("convertFileSrc", Capacitor.convertFileSrc("/data/user/0/io.ionic.starter/files/ionic_built_snapshots/" + this.app_path + ""));
    // file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/
    this.path =
      'https://localhost/_capacitor_file_/data/user/0/io.ionic.starter/files/ionic_built_snapshots/' +
      this.app_path
      + '/index.html';

      
    // 
    // this.path ="/data/user/0/io.ionic.starter/files/ionic_built_snapshots/a0f5f26a-8f0c-42c6-9bb3-47e9db66ee14"
    // /data/user/0/io.ionic.starter/files/ionic_built_snapshots/a0f5f26a-8f0c-42c6-9bb3-47e9db66ee14
    //   this.path = 'file:///data/user/0/com.hdfc.ionicApps/files/ionic_built_snapshots/' + app_path + '/index.html';
    // https://localhost/_capacitor_file_/data/user/0/io.ionic.starter/files/ionic_built_snapshots/a0f5f26a-8f0c-42c6-9bb3-47e9db66ee14
    console.log("app_path = ", this.app_path);
    if (this.app_path == undefined) {
      console.log("if condition");
      var toast_message =
        "e29855fb" + ' ' + 'missing..' + ' ' + 'fetching from server ..';

      const showHelloToast = async () => {
        await Toast.show({
          text: toast_message,
        });
      };

      this.callUpdate_1(item['APP_ID']);
    } else {
      console.log("else condition");
      const browser = this.inAppBrowser.create(this.path, '_self', {
        clearcache: 'yes',
        clearsessioncache: 'yes',
      });
      // await Browser.open({ url: this.path })
    }
  }



  openfirstlink() {
    WebView.getServerBasePath()
      .then(data => {
        alert("getServerBasePath" + data.path);
        // public
        WebView.setServerBasePath({ path: data.path }).then(data1 => {
          alert("set server base path  called = " + data1);
        });
      });

    // this.inAppBrowser.create('https://localhost/_capacitor_file_/data/user/0/io.ionic.starter/files/ionic_built_snapshots/' +
    //   this.app_path
    //   + '/index.html', '_self', {
    //   clearcache: 'yes',
    //   clearsessioncache: 'yes',
    // })
  }


  opensecolink() {
    this.inAppBrowser.create('file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/' +
      this.app_path
      + '/index.html', '_self', {
      clearcache: 'yes',
      clearsessioncache: 'yes',
    })
  }

  seekChannels(versions: any, channel: any) {
    debugger;
    for (var i = 0, l = versions.length; i < l; i++) {
      if (typeof versions[i] == 'object' && versions[i].channel === channel) {
        return versions[i].versionId;
      }
    }
  }

  async callUpdate_1(channel: any) {
    // let conntype = (await Network.getStatus()).connectionType;
    // console.log("conntype Condition= ", conntype && conntype !== 'unknown' && conntype !== 'none');

    // if (conntype && conntype !== 'unknown' && conntype !== 'none') {
      // if (this.syncflag == false) {
      console.log('insdie call update');
      // this.syncflag = true;
      // for (var i = 0; i < this.packList.length; i++) {
      // console.log(this.packList[i]);
      // this.force_close = false;
      this.progress = 0;
      // var channel_name= packList[i];
      // console.log(channel_name);
      await this.performManualUpdatecrm(channel);
      // }
      // this.syncflag = false;
      // }
    // } else {
    //   alert('Pls check the ineternet..and click on refresh icon');
    // }
  }

  async performManualUpdatecrm(channel: any) {
    // let loading_1 = this.loadingCtrl.create({
    //   spinner: 'crescent',
    // });

    // let current_sync = true;
    // loading_1.present();

    const versions = await this.deploy.getAvailableVersions();
    console.log("version = ", versions);
    const config = {
      appId: '8e952907',
      channel: channel,
    };

    await this.deploy.configure(config);

    var prevVersion = '';
    if (versions.length > 0) {
      prevVersion = await this.seekChannels(versions, channel);
      console.log("prevVersion = ", prevVersion);
    }

    try {
      // let alert = this.alertCtrl.create({
      //   title: '',
      //   subTitle:
      //     channel +
      //     ' ' +
      //     'Loading' +
      //     ' ' +
      //     '<img src="../assets/imgs/ajax-loader (1).gif">',
      //   buttons: [
      //     {
      //       text: 'Cancel',
      //       handler: () => {
      //         alert.dismiss();
      //       },
      //     },
      //   ],
      //   enableBackdropDismiss: false, // <- Here! :)
      // });

      let interval_1 = setTimeout(() => {
        // call your functions like

        // if (prevVersion != '' && prevVersion != undefined) {
        //   loading_1.dismiss();
        // }
      }, 4000);

      const update = await this.deploy.checkForUpdate();
      debugger;
      clearTimeout(interval_1);
      // loading_1.dismiss();

      console.log(prevVersion);
      if (update.available == true && update.snapshot != prevVersion) {
        console.log('Fired for update');

        this.interval = setTimeout(() => {
          // call your functions like
          if (
            // this.syncflag == true &&
            prevVersion != '' &&
            prevVersion != undefined
          ) {
            // const confirm = this.alertCtrl.create({
            //   title: 'Slow internet detected.....',
            //   message: 'Do you want to continue?',
            //   buttons: [
            //     {
            //       text: 'Cancel',
            //       handler: () => {
            //         this.force_close = true;
            //         alert.dismiss();
            //       },
            //     },
            //     {
            //       text: 'Continue',
            //       handler: () => {
            //         console.log('Agree clicked');
            //       },
            //     },
            //   ],
            // });
            // confirm.present();
          } else {
            alert('Slow internet connection detected...');
          }
          // alert('success');
        }, 150000);

        // alert.present();

        await this.deploy.downloadUpdate((progress) => {
          this.progress = progress;
          this.current_status = channel + ' ' + 'download status';

          console.log("downloadUpdate", progress);
        });

        await this.deploy.extractUpdate((progress) => {
          this.current_status = channel + ' ' + 'extract status';
          console.log("extractUpdate", progress);

          this.progress = progress;
        });

        console.log(prevVersion);
        if (prevVersion != '') {
          this.deploy.deleteVersionById(prevVersion);
        }
        this.openfirstlink();

        // loading.dismiss();
        // alert.dismiss();
        //await this.deploy.reloadApp();
      }
      clearTimeout(this.interval);
    } catch (error) {
      // this.syncflag = false;
      // Code to handle exception
    }
  }
}
