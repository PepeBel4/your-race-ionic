import { Component, OnInit } from '@angular/core';

import { RaceInfoPage } from '../raceinfo/raceinfo';
import { StartPage } from '../start/start';
import { FinishPage } from '../finish/finish';
import { WeatherPage } from '../weather/weather';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = RaceInfoPage;
  tab2Root = StartPage;
  tab3Root = FinishPage;
  tab4Root = WeatherPage;
  tab5Root = SettingsPage;

  constructor(
  ) {}
}
