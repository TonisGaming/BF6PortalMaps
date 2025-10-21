
import * as modlib from 'modlib';

function OngoingGlobal_Initialise_Action() {
 mod.SetVariable(GameOngoingGlobalVar,false)
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(1),OtherTeamTeamVar),mod.GetTeam(2))
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(2),OtherTeamTeamVar),mod.GetTeam(1))
 mod.SetVariable(UniqueUI4GlobalVar,1500)
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar),mod.GetVariable(UniqueUI4GlobalVar))
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar),mod.GetVariable(UniqueUI4GlobalVar))
 mod.SetVariable(ScorePositionLeftGlobalVar,mod.CreateVector(-315,50,0))
 mod.SetVariable(ScorePositionRightGlobalVar,mod.CreateVector(315,50,0))
 mod.SetVariable(FriendlyTextColourGlobalVar,mod.CreateVector(0,0.8,1))
 mod.SetVariable(FriendlyBGColourGlobalVar,mod.CreateVector(0,0.2,0.5))
 mod.SetVariable(EnemyTextColourGlobalVar,mod.CreateVector(1,0.2,0.2))
 mod.SetVariable(EnemyBGColourGlobalVar,mod.CreateVector(0.6,0.1,0.1))
 UniquePlayerUI1()
 UniquePlayerUI2()
 ObjectiveLetters()
 ObjectiveTeamUI_Array()
}
function OngoingGlobal_Initialise(conditionState: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OngoingGlobal_Initialise_Action();
}

function OnGameModeStarted_MapSetup_Action() {
 mod.SetGameModeTimeLimit(2700)
 mod.SetGameModeTargetScore(1)
 Scoreboard()
 for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.AllCapturePoints()); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
  CapturePointSetup(mod.ValueInArray(mod.AllCapturePoints(),mod.GetVariable(iteratorGlobalVar)))
 }
 mod.SetVariable(GameOngoingGlobalVar,true)
}
function OnGameModeStarted_MapSetup(conditionState: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnGameModeStarted_MapSetup_Action();
}

function OngoingGlobal_Update_Score_and_Time_Condition(): boolean {
  const newState = mod.And(mod.GetVariable(GameOngoingGlobalVar),mod.Equals(
  mod.Modulo(
  mod.RoundToInteger(mod.GetMatchTimeElapsed()),
  2),
  0))
 return newState;
}

function OngoingGlobal_Update_Score_and_Time_Action() {
 Scoreboard()
}
function OngoingGlobal_Update_Score_and_Time(conditionState: any) {
let newState = OngoingGlobal_Update_Score_and_Time_Condition();
if (!conditionState.update(newState)) {
 return;
}
OngoingGlobal_Update_Score_and_Time_Action();
}

function OngoingGlobal_Update_Score_and_Time1_Condition(): boolean {
  const newState = mod.And(mod.GetVariable(GameOngoingGlobalVar),mod.Equals(
  mod.Modulo(
  mod.RoundToInteger(mod.GetMatchTimeElapsed()),
  2),
  1))
 return newState;
}

function OngoingGlobal_Update_Score_and_Time1_Action() {
 Scoreboard()
}
function OngoingGlobal_Update_Score_and_Time1(conditionState: any) {
let newState = OngoingGlobal_Update_Score_and_Time1_Condition();
if (!conditionState.update(newState)) {
 return;
}
OngoingGlobal_Update_Score_and_Time1_Action();
}

function OngoingGlobal_Score_tracker_Condition(): boolean {
  const newState = mod.And(mod.GetVariable(GameOngoingGlobalVar),mod.Equals(
  mod.Modulo(
  mod.RoundToInteger(mod.GetMatchTimeElapsed()),
  4),
  0))
 return newState;
}

function OngoingGlobal_Score_tracker_Action() {
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar),mod.Subtract(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.CountOf(modlib.FilteredArray(
mod.AllCapturePoints(),
(currentArrayElement: any) => mod.Equals(
mod.GetCurrentOwnerTeam(currentArrayElement),
mod.GetTeam(2))))))
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar),mod.Subtract(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.CountOf(modlib.FilteredArray(
mod.AllCapturePoints(),
(currentArrayElement: any) => mod.Equals(
mod.GetCurrentOwnerTeam(currentArrayElement),
mod.GetTeam(1))))))
 if (modlib.IsTrueForAll(mod.AllCapturePoints(),(currentArrayElement: any) => mod.Equals(
mod.GetCurrentOwnerTeam(currentArrayElement),
mod.GetTeam(1)))) {
  mod.SetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar),mod.Subtract(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
10))
 } else if (modlib.IsTrueForAll(mod.AllCapturePoints(),(currentArrayElement: any) => mod.Equals(
mod.GetCurrentOwnerTeam(currentArrayElement),
mod.GetTeam(2)))) {
  mod.SetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar),mod.Subtract(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
10))
 } else {
 }
}
function OngoingGlobal_Score_tracker(conditionState: any) {
let newState = OngoingGlobal_Score_tracker_Condition();
if (!conditionState.update(newState)) {
 return;
}
OngoingGlobal_Score_tracker_Action();
}

function OnPlayerEarnedKill_Ean_Kill_Action(eventInfo: any) {
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),ScorePlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),ScorePlayerVar)),
10))
 UpdatePlayerScoreboard(mod.EventPlayer())
}
function OnPlayerEarnedKill_Ean_Kill(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnPlayerEarnedKill_Ean_Kill_Action(eventInfo);
}

function OnPlayerEarnedKillAssist_Kill_assist_Action(eventInfo: any) {
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),ScorePlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),ScorePlayerVar)),
5))
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),KillAssistsPlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),KillAssistsPlayerVar)),
1))
 UpdatePlayerScoreboard(mod.EventPlayer())
}
function OnPlayerEarnedKillAssist_Kill_assist(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnPlayerEarnedKillAssist_Kill_assist_Action(eventInfo);
}

function OnRevived_Revive_Counter_Action(eventInfo: any) {
 mod.SetVariable(mod.ObjectVariable(mod.EventOtherPlayer(),ScorePlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(mod.EventOtherPlayer(),ScorePlayerVar)),
10))
 mod.SetVariable(mod.ObjectVariable(mod.EventOtherPlayer(),RevivesPlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(mod.EventOtherPlayer(),RevivesPlayerVar)),
1))
 UpdatePlayerScoreboard(mod.EventOtherPlayer())
}
function OnRevived_Revive_Counter(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnRevived_Revive_Counter_Action(eventInfo);
}

function OnPlayerJoinGame_Sets_Scoreboard_Action(eventInfo: any) {
 await mod.Wait(5)
 MainUI_ScoreandTime()
 UpdatePlayerScoreboard(mod.EventPlayer())
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),OnPointPlayerVar),false)
}
function OnPlayerJoinGame_Sets_Scoreboard(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnPlayerJoinGame_Sets_Scoreboard_Action(eventInfo);
}

function OnPlayerUndeploy_Death_Update_Condition(eventInfo: any): boolean {
  const newState = mod.GetVariable(GameOngoingGlobalVar);
 return newState;
}

function OnPlayerUndeploy_Death_Update_Action(eventInfo: any) {
 mod.SetVariable(mod.ObjectVariable(mod.GetTeam(mod.EventPlayer()),TeamScoreTeamVar),mod.Subtract(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(mod.EventPlayer()),TeamScoreTeamVar)),
1))
 UpdatePlayerScoreboard(mod.EventPlayer())
 Scoreboard()
}
function OnPlayerUndeploy_Death_Update(conditionState: any, eventInfo: any) {
let newState = OnPlayerUndeploy_Death_Update_Condition(eventInfo);
if (!conditionState.update(newState)) {
 return;
}
OnPlayerUndeploy_Death_Update_Action(eventInfo);
}

function OnCapturePointCaptured_On_Capture_Action(eventInfo: any) {
 await mod.Wait(0.2)
 mod.SetVariable(PlayersOnObjectiveGlobalVar,mod.EmptyArray())
 mod.SetVariable(PlayersOnObjectiveGlobalVar,modlib.FilteredArray(
mod.GetPlayersOnPoint(mod.EventCapturePoint()),
(currentArrayElement: any) => mod.Equals(
mod.GetTeam(currentArrayElement),
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()))))
 for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.GetVariable(PlayersOnObjectiveGlobalVar)); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
  ObjectiveCapturedPlayerData(mod.ValueInArray(mod.GetVariable(PlayersOnObjectiveGlobalVar),mod.GetVariable(iteratorGlobalVar)))
 }
 ObjectiveVehicleSpawn()
 mod.PlayVO(mod.GetVO(1),mod.VoiceOverEvents2D.ObjectiveCaptured,mod.VoiceOverFlags.Alpha,mod.GetCurrentOwnerTeam(mod.EventCapturePoint()))
 await mod.Wait(0.1)
 mod.PlayVO(mod.GetVO(1),mod.VoiceOverEvents2D.ObjectiveCapturedEnemy,mod.VoiceOverFlags.Alpha,mod.GetVariable(mod.ObjectVariable(mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),OtherTeamTeamVar)))
}
function OnCapturePointCaptured_On_Capture(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnCapturePointCaptured_On_Capture_Action(eventInfo);
}

function OngoingGlobal_End_Game_Condition(): boolean {
  const newState = mod.And(mod.GetVariable(GameOngoingGlobalVar),mod.Or(
  mod.LessThanEqualTo(mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),0),
  mod.LessThanEqualTo(mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),0)))
 return newState;
}

function OngoingGlobal_End_Game_Action() {
 mod.SetVariable(GameOngoingGlobalVar,false)
 if (mod.LessThan(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
0)) {
  mod.SetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar),0)
 }
 if (mod.LessThan(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
0)) {
  mod.SetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar),0)
 }
 mod.SetVariable(ScorePositionLeftGlobalVar,mod.CreateVector(-300,385,0))
 mod.SetVariable(ScorePositionRightGlobalVar,mod.CreateVector(300,385,0))
 Scoreboard()
 mod.SetUIWidgetSize(mod.FindUIWidgetWithName("Timer"),mod.CreateVector(190,60,0))
 mod.SetUITextSize(mod.FindUIWidgetWithName("Timer"),48)
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName("Timer"),mod.CreateVector(0,390,0))
 mod.DeleteUIWidget(mod.FindUIWidgetWithName("Team1LeftBar"))
 mod.DeleteUIWidget(mod.FindUIWidgetWithName("Team1RightBar"))
 mod.DeleteUIWidget(mod.FindUIWidgetWithName("Team2LeftBar"))
 mod.DeleteUIWidget(mod.FindUIWidgetWithName("Team2RightBar"))
 EndGame_UI("Team1ScoreLeft",mod.GetVariable(ScorePositionLeftGlobalVar))
 EndGame_UI("Team1ScoreRight",mod.GetVariable(ScorePositionRightGlobalVar))
 EndGame_UI("Team2ScoreLeft",mod.GetVariable(ScorePositionLeftGlobalVar))
 EndGame_UI("Team2ScoreRight",mod.GetVariable(ScorePositionRightGlobalVar))
 if (mod.GreaterThan(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)))) {
  mod.SetGameModeScore(mod.GetTeam(1),1)
 } else if (mod.GreaterThan(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)))) {
  mod.SetGameModeScore(mod.GetTeam(2),1)
 } else {
  mod.SetGameModeScore(mod.GetTeam(1),1)
  mod.SetGameModeScore(mod.GetTeam(2),1)
 }
}
function OngoingGlobal_End_Game(conditionState: any) {
let newState = OngoingGlobal_End_Game_Condition();
if (!conditionState.update(newState)) {
 return;
}
OngoingGlobal_End_Game_Action();
}

function OnCapturePointCapturing_Bug_fix_for_capture_times_Action(eventInfo: any) {
 CapturePointSetup(mod.EventCapturePoint())
}
function OnCapturePointCapturing_Bug_fix_for_capture_times(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnCapturePointCapturing_Bug_fix_for_capture_times_Action(eventInfo);
}

function OnPlayerEnterCapturePoint_CapturePoint_UI_Condition(eventInfo: any): boolean {
  const newState = mod.Not(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),OnPointPlayerVar)));
 return newState;
}

function OnPlayerEnterCapturePoint_CapturePoint_UI_Action(eventInfo: any) {
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),OnPointPlayerVar),true)
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar),mod.ValueInArray(mod.GetVariable(UniqueUI_IDGlobalVar),modlib.IndexOfFirstTrue(
mod.AllPlayers(),
(currentArrayElement: any) => mod.Equals(
currentArrayElement,
mod.EventPlayer()))))
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar),mod.ValueInArray(mod.GetVariable(UniqueBackground_IDGlobalVar),modlib.IndexOfFirstTrue(
mod.AllPlayers(),
(currentArrayElement: any) => mod.Equals(
currentArrayElement,
mod.EventPlayer()))))
 mod.AddUIText(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar)),mod.CreateVector(0,150,0),mod.CreateVector(210,40,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),mod.UIBgFill.Blur)
 mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),0.8)
 mod.SetUIWidgetDepth(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),mod.UIDepth.BelowGameUI)
 mod.AddUIText(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar)),mod.CreateVector(0,150,0),mod.CreateVector(210,40,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.UIBgFill.OutlineThin)
 mod.SetUIWidgetDepth(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.UIDepth.AboveGameUI)
 mod.SetUITextAnchor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.UIAnchor.Center)
 while (mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),OnPointPlayerVar))) {
  if (mod.LessThan(
mod.GetCaptureProgress(mod.GetCapturePoint(mod.GetObjId(mod.EventCapturePoint()))),
1)) {
   if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetTeam(mod.EventPlayer()))) {
    mod.SetUITextColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.GetVariable(FriendlyTextColourGlobalVar))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.GetVariable(FriendlyTextColourGlobalVar))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),mod.GetVariable(FriendlyBGColourGlobalVar))
   } else if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(mod.EventPlayer()),OtherTeamTeamVar)))) {
    mod.SetUITextColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.GetVariable(EnemyTextColourGlobalVar))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.GetVariable(EnemyTextColourGlobalVar))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),mod.GetVariable(EnemyBGColourGlobalVar))
   } else {
    mod.SetUITextColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.CreateVector(1,1,1))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.CreateVector(1,1,1))
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))),mod.CreateVector(0.6,0.6,0.6))
   }
   if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetTeam(mod.EventPlayer()))) {
    ObjectiveUI("Defending  {} - {}")
   } else {
    ObjectiveUI("Capturing  {} - {}")
   }
  } else {
   if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetTeam(mod.EventPlayer()))) {
    ObjectiveUI("Secured  {} - {}")
   } else {
    ObjectiveUI("Contested  {} - {}")
   }
  }
  await mod.Wait(0.1)
 }
}
function OnPlayerEnterCapturePoint_CapturePoint_UI(conditionState: any, eventInfo: any) {
let newState = OnPlayerEnterCapturePoint_CapturePoint_UI_Condition(eventInfo);
if (!conditionState.update(newState)) {
 return;
}
OnPlayerEnterCapturePoint_CapturePoint_UI_Action(eventInfo);
}

function OnPlayerExitCapturePoint_Remove_CapturePoint_UI_Action(eventInfo: any) {
 mod.DeleteUIWidget(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))))
 mod.DeleteUIWidget(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_OutlinePlayerVar))))
 mod.SetVariable(mod.ObjectVariable(mod.EventPlayer(),OnPointPlayerVar),false)
}
function OnPlayerExitCapturePoint_Remove_CapturePoint_UI(conditionState: any, eventInfo: any) {
let newState = true;
if (!conditionState.update(newState)) {
 return;
}
OnPlayerExitCapturePoint_Remove_CapturePoint_UI_Action(eventInfo);
}

function Scoreboard() {


 mod.SetVariable(FlagLettersGlobalVar,"")
 if (mod.LessThan(
mod.RoundToInteger(mod.Subtract(
mod.GetMatchTimeRemaining(),
mod.Multiply(mod.Floor(mod.Divide(
mod.GetMatchTimeRemaining(),
60)),60))),
10)) {
  mod.SetVariable(FlagLettersGlobalVar,"0")
 }
 mod.SetScoreboardColumnNames(mod.Message("Score"),mod.Message("Kills"),mod.Message("Deaths"),mod.Message("Assists"),mod.Message("Captures"))
 mod.SetUITextLabel(mod.FindUIWidgetWithName("Team1ScoreLeft"),mod.Message("{}",mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar))))
 mod.SetUITextLabel(mod.FindUIWidgetWithName("Team1ScoreRight"),mod.Message("{}",mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar))))
 mod.SetUITextLabel(mod.FindUIWidgetWithName("Team2ScoreLeft"),mod.Message("{}",mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar))))
 mod.SetUITextLabel(mod.FindUIWidgetWithName("Team2ScoreRight"),mod.Message("{}",mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar))))
 mod.SetUITextLabel(mod.FindUIWidgetWithName("Timer"),mod.Message("{} : {}{}",mod.Floor(mod.Divide(
mod.GetMatchTimeRemaining(),
60)),mod.GetVariable(FlagLettersGlobalVar),mod.RoundToInteger(mod.Subtract(
mod.GetMatchTimeRemaining(),
mod.Multiply(mod.Floor(mod.Divide(
mod.GetMatchTimeRemaining(),
60)),60)))))
 mod.SetUIWidgetSize(mod.FindUIWidgetWithName("Team1LeftBar"),mod.CreateVector(mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),10,0))
 mod.SetUIWidgetSize(mod.FindUIWidgetWithName("Team2LeftBar"),mod.CreateVector(mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),10,0))
 mod.SetUIWidgetSize(mod.FindUIWidgetWithName("Team1RightBar"),mod.CreateVector(mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),10,0))
 mod.SetUIWidgetSize(mod.FindUIWidgetWithName("Team2RightBar"),mod.CreateVector(mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),10,0))
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName("Team1LeftBar"),mod.CreateVector(mod.Add(
-260,
mod.Divide(
mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),
2)),60,0))
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName("Team1RightBar"),mod.CreateVector(mod.Subtract(
260,
mod.Divide(
mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),
2)),60,0))
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName("Team2LeftBar"),mod.CreateVector(mod.Add(
-260,
mod.Divide(
mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(2),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),
2)),60,0))
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName("Team2RightBar"),mod.CreateVector(mod.Subtract(
260,
mod.Divide(
mod.Multiply(200,mod.Divide(
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(1),TeamScoreTeamVar)),
mod.GetVariable(UniqueUI4GlobalVar))),
2)),60,0))
 for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.AllCapturePoints()); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
  if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.ValueInArray(mod.AllCapturePoints(),mod.GetVariable(iteratorGlobalVar))),
mod.GetTeam(1))) {
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.GetVariable(FriendlyTextColourGlobalVar))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.GetVariable(FriendlyBGColourGlobalVar))
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.GetVariable(EnemyTextColourGlobalVar))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.GetVariable(EnemyBGColourGlobalVar))
  } else if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.ValueInArray(mod.AllCapturePoints(),mod.GetVariable(iteratorGlobalVar))),
mod.GetTeam(2))) {
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.GetVariable(EnemyTextColourGlobalVar))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.GetVariable(EnemyBGColourGlobalVar))
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.GetVariable(FriendlyTextColourGlobalVar))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.GetVariable(FriendlyBGColourGlobalVar))
  } else {
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.CreateVector(1,1,1))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.CreateVector(0,0,0))
   mod.SetUITextColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.CreateVector(1,1,1))
   mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
mod.GetVariable(iteratorGlobalVar),
26))),mod.CreateVector(0,0,0))
  }
 }
}
function UpdatePlayerScoreboard(Player: any) {


 mod.SetScoreboardPlayerValues(Player,mod.GetVariable(mod.ObjectVariable(Player,ScorePlayerVar)),mod.GetPlayerKills(Player),mod.GetPlayerDeaths(Player),mod.GetVariable(mod.ObjectVariable(Player,KillAssistsPlayerVar)),mod.GetVariable(mod.ObjectVariable(Player,CapturesPlayerVar)))
}
function CapturePointSetup(Objective: any) {


 mod.EnableGameModeObjective(Objective,true)
 mod.SetCapturePointCapturingTime(Objective,15)
 mod.SetCapturePointNeutralizationTime(Objective,15)
 mod.SetMaxCaptureMultiplier(Objective,3)
}
function ObjectiveVehicleSpawn() {


 if (mod.IsCurrentMap(mod.Maps.Abbasid)) {
  if (mod.Equals(
mod.EventCapturePoint(),
mod.GetCapturePoint(202))) {
   if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetTeam(1))) {
    mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(600))
   } else if (mod.Equals(
mod.GetCurrentOwnerTeam(mod.EventCapturePoint()),
mod.GetTeam(2))) {
    mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(601))
   } else {
   }
  }
 }
}
function ObjectiveCapturedPlayerData(Player: any) {


 mod.SetVariable(mod.ObjectVariable(Player,CapturesPlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(Player,CapturesPlayerVar)),
1))
 mod.SetVariable(mod.ObjectVariable(Player,ScorePlayerVar),mod.Add(
mod.GetVariable(mod.ObjectVariable(Player,ScorePlayerVar)),
50))
 mod.PlaySound(mod.GetSFX(501),1,Player)
 UpdatePlayerScoreboard(Player)
}
function AppendToArray(Value: any) {


 mod.SetVariable(ObjectiveTrackingUIGlobalVar,mod.AppendToArray(mod.GetVariable(ObjectiveTrackingUIGlobalVar),Value))
}
function UniquePlayerUI1() {


 mod.SetVariable(UniqueUI_IDGlobalVar,mod.EmptyArray())
 mod.SetVariable(ObjectiveTrackingUIGlobalVar,mod.EmptyArray())
 AppendToArray("1")
 AppendToArray("2")
 AppendToArray("3")
 AppendToArray("4")
 AppendToArray("5")
 AppendToArray("6")
 AppendToArray("7")
 AppendToArray("8")
 AppendToArray("9")
 AppendToArray("10")
 AppendToArray("11")
 AppendToArray("12")
 AppendToArray("13")
 AppendToArray("14")
 AppendToArray("15")
 AppendToArray("16")
 AppendToArray("17")
 AppendToArray("18")
 AppendToArray("19")
 AppendToArray("20")
 AppendToArray("21")
 AppendToArray("22")
 AppendToArray("23")
 AppendToArray("24")
 AppendToArray("25")
 AppendToArray("26")
 AppendToArray("27")
 AppendToArray("28")
 AppendToArray("29")
 AppendToArray("30")
 AppendToArray("31")
 AppendToArray("32")
 AppendToArray("33")
 AppendToArray("34")
 AppendToArray("35")
 AppendToArray("36")
 AppendToArray("37")
 AppendToArray("38")
 AppendToArray("39")
 AppendToArray("40")
 AppendToArray("41")
 AppendToArray("42")
 AppendToArray("43")
 AppendToArray("44")
 AppendToArray("45")
 AppendToArray("46")
 AppendToArray("47")
 AppendToArray("48")
 AppendToArray("49")
 AppendToArray("50")
 AppendToArray("51")
 AppendToArray("52")
 AppendToArray("53")
 AppendToArray("54")
 AppendToArray("55")
 AppendToArray("56")
 AppendToArray("57")
 AppendToArray("58")
 AppendToArray("59")
 AppendToArray("60")
 AppendToArray("61")
 AppendToArray("62")
 AppendToArray("63")
 AppendToArray("64")
 mod.SetVariable(UniqueUI_IDGlobalVar,mod.GetVariable(ObjectiveTrackingUIGlobalVar))
}
function ObjectiveUI(Label: string) {


 mod.SetUITextLabel(mod.FindUIWidgetWithName(mod.GetVariable(mod.ObjectVariable(mod.EventPlayer(),UI_IDTextPlayerVar))),mod.Message(Label,mod.CountOf(modlib.FilteredArray(
mod.GetPlayersOnPoint(mod.EventCapturePoint()),
(currentArrayElement: any) => mod.Equals(
mod.GetTeam(currentArrayElement),
mod.GetTeam(mod.EventPlayer())))),mod.CountOf(modlib.FilteredArray(
mod.GetPlayersOnPoint(mod.EventCapturePoint()),
(currentArrayElement: any) => mod.Equals(
mod.GetTeam(currentArrayElement),
mod.GetVariable(mod.ObjectVariable(mod.GetTeam(mod.EventPlayer()),OtherTeamTeamVar))))),mod.GetCaptureProgress(mod.EventCapturePoint())))
}
function TeamUI_Setup(Name: string, TextColour: any, BackgroundColour: any, FontSize: number, Alpha: number) {


 mod.SetUITextColor(mod.FindUIWidgetWithName(Name),TextColour)
 mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(Name),BackgroundColour)
 mod.SetUITextSize(mod.FindUIWidgetWithName(Name),FontSize)
 mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName(Name),Alpha)
 mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(Name),mod.UIBgFill.Blur)
}
function UniquePlayerUI2() {


 mod.SetVariable(UniqueBackground_IDGlobalVar,mod.EmptyArray())
 mod.SetVariable(ObjectiveTrackingUIGlobalVar,mod.EmptyArray())
 AppendToArray("ID1")
 AppendToArray("ID2")
 AppendToArray("ID3")
 AppendToArray("ID4")
 AppendToArray("ID5")
 AppendToArray("ID6")
 AppendToArray("ID7")
 AppendToArray("ID8")
 AppendToArray("ID9")
 AppendToArray("ID10")
 AppendToArray("ID11")
 AppendToArray("ID12")
 AppendToArray("ID13")
 AppendToArray("ID14")
 AppendToArray("ID15")
 AppendToArray("ID16")
 AppendToArray("UID17")
 AppendToArray("ID18")
 AppendToArray("ID19")
 AppendToArray("ID20")
 AppendToArray("ID21")
 AppendToArray("ID22")
 AppendToArray("ID23")
 AppendToArray("ID24")
 AppendToArray("ID25")
 AppendToArray("ID26")
 AppendToArray("ID27")
 AppendToArray("ID28")
 AppendToArray("ID29")
 AppendToArray("ID30")
 AppendToArray("ID31")
 AppendToArray("ID32")
 AppendToArray("ID33")
 AppendToArray("ID34")
 AppendToArray("ID35")
 AppendToArray("ID36")
 AppendToArray("ID37")
 AppendToArray("ID38")
 AppendToArray("ID39")
 AppendToArray("ID40")
 AppendToArray("ID41")
 AppendToArray("ID42")
 AppendToArray("ID43")
 AppendToArray("ID44")
 AppendToArray("ID45")
 AppendToArray("ID46")
 AppendToArray("ID47")
 AppendToArray("ID48")
 AppendToArray("ID49")
 AppendToArray("ID50")
 AppendToArray("ID51")
 AppendToArray("ID52")
 AppendToArray("ID53")
 AppendToArray("ID54")
 AppendToArray("ID55")
 AppendToArray("ID56")
 AppendToArray("ID57")
 AppendToArray("ID58")
 AppendToArray("ID59")
 AppendToArray("ID60")
 AppendToArray("ID61")
 AppendToArray("ID62")
 AppendToArray("ID63")
 AppendToArray("ID64")
 mod.SetVariable(UniqueBackground_IDGlobalVar,mod.GetVariable(ObjectiveTrackingUIGlobalVar))
}
function MainUI_ScoreandTime() {


 mod.AddUIText("Timer",mod.CreateVector(0,50,0),mod.CreateVector(85,30,0),mod.UIAnchor.TopCenter,mod.Message("{} : {}",mod.Floor(mod.Divide(
mod.GetMatchTimeRemaining(),
60)),mod.RoundToInteger(mod.Subtract(
mod.GetMatchTimeRemaining(),
mod.Multiply(mod.Floor(mod.Divide(
mod.GetMatchTimeRemaining(),
60)),60)))),mod.EventPlayer())
 TeamUI_Setup("Timer",mod.CreateVector(1,1,1),mod.CreateVector(0,0,0),24,0.4)
 mod.SetUITextAnchor(mod.FindUIWidgetWithName("Timer"),mod.UIAnchor.Center)
 mod.AddUIText("LeftBarBG",mod.CreateVector(-160,60,0),mod.CreateVector(200,10,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.AddUIText("RightBarBG",mod.CreateVector(160,60,0),mod.CreateVector(200,10,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 UI_BarSetup("LeftBarBG",mod.GetVariable(FriendlyBGColourGlobalVar),0.8,mod.UIBgFill.Blur)
 UI_BarSetup("RightBarBG",mod.GetVariable(EnemyBGColourGlobalVar),0.8,mod.UIBgFill.Blur)
 if (mod.Equals(
mod.GetTeam(mod.EventPlayer()),
mod.GetTeam(1))) {
  UI_ScoreSetup("Team1ScoreLeft","Team1ScoreRight","Team1LeftBar","Team1RightBar")
  TeamUI_Setup("Team1ScoreLeft",mod.GetVariable(FriendlyTextColourGlobalVar),mod.GetVariable(FriendlyBGColourGlobalVar),28,0.8)
  TeamUI_Setup("Team1ScoreRight",mod.GetVariable(EnemyTextColourGlobalVar),mod.GetVariable(EnemyBGColourGlobalVar),28,0.8)
  UI_BarSetup("Team1LeftBar",mod.GetVariable(FriendlyTextColourGlobalVar),1,mod.UIBgFill.Solid)
  UI_BarSetup("Team1RightBar",mod.GetVariable(EnemyTextColourGlobalVar),1,mod.UIBgFill.Solid)
  for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.AllCapturePoints()); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
   mod.AddUIText(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar)),mod.CreateVector(mod.Multiply(mod.Subtract(
mod.GetVariable(iteratorGlobalVar),
mod.Divide(
mod.Subtract(
mod.CountOf(mod.AllCapturePoints()),
1),
2)),50),90,0),mod.CreateVector(30,30,0),mod.UIAnchor.TopCenter,mod.Message(mod.ValueInArray(mod.GetVariable(UniqueUI3GlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.EventPlayer())
   UI_BarSetup(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.GetVariable(iteratorGlobalVar)),mod.CreateVector(0,0,0),0.8,mod.UIBgFill.Blur)
  }
 } else {
  UI_ScoreSetup("Team2ScoreLeft","Team2ScoreRight","Team2LeftBar","Team2RightBar")
  TeamUI_Setup("Team2ScoreLeft",mod.GetVariable(FriendlyTextColourGlobalVar),mod.GetVariable(FriendlyBGColourGlobalVar),28,0.8)
  TeamUI_Setup("Team2ScoreRight",mod.GetVariable(EnemyTextColourGlobalVar),mod.GetVariable(EnemyBGColourGlobalVar),28,0.8)
  UI_BarSetup("Team2LeftBar",mod.GetVariable(FriendlyTextColourGlobalVar),1,mod.UIBgFill.Solid)
  UI_BarSetup("Team2RightBar",mod.GetVariable(EnemyTextColourGlobalVar),1,mod.UIBgFill.Solid)
  for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.AllCapturePoints()); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
   for (let iteratorVar = 0; iteratorVar < mod.CountOf(mod.AllCapturePoints()); iteratorVar += 1) {
mod.SetVariable(iteratorGlobalVar, iteratorVar);
    mod.AddUIText(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
26,
mod.GetVariable(iteratorGlobalVar))),mod.CreateVector(mod.Multiply(mod.Subtract(
mod.GetVariable(iteratorGlobalVar),
mod.Divide(
mod.Subtract(
mod.CountOf(mod.AllCapturePoints()),
1),
2)),50),90,0),mod.CreateVector(30,30,0),mod.UIAnchor.TopCenter,mod.Message(mod.ValueInArray(mod.GetVariable(UniqueUI3GlobalVar),mod.GetVariable(iteratorGlobalVar))),mod.EventPlayer())
    UI_BarSetup(mod.ValueInArray(mod.GetVariable(StartingScoreGlobalVar),mod.Add(
26,
mod.GetVariable(iteratorGlobalVar))),mod.CreateVector(0,0,0),0.8,mod.UIBgFill.Blur)
   }
  }
 }
}
function EndGame_UI(UI: string, Position: any) {


 mod.SetUIWidgetSize(mod.FindUIWidgetWithName(UI),mod.CreateVector(160,70,0))
 mod.SetUITextSize(mod.FindUIWidgetWithName(UI),64)
 mod.SetUIWidgetPosition(mod.FindUIWidgetWithName(UI),Position)
}
function UI_BarSetup(UI: string, Colour: any, Alpha: number, Style: any) {


 mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(UI),Colour)
 mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName(UI),Alpha)
 mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(UI),Style)
}
function UI_ScoreSetup(LeftScore: string, RightScore: string, LeftBar: string, RightBar: string) {


 mod.AddUIText(LeftScore,mod.GetVariable(ScorePositionLeftGlobalVar),mod.CreateVector(80,30,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.AddUIText(RightScore,mod.GetVariable(ScorePositionRightGlobalVar),mod.CreateVector(80,30,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.AddUIText(LeftBar,mod.CreateVector(-160,60,0),mod.CreateVector(200,10,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.AddUIText(RightBar,mod.CreateVector(160,60,0),mod.CreateVector(200,10,0),mod.UIAnchor.TopCenter,mod.Message(""),mod.EventPlayer())
 mod.SetUITextAnchor(mod.FindUIWidgetWithName(LeftScore),mod.UIAnchor.Center)
 mod.SetUITextAnchor(mod.FindUIWidgetWithName(RightScore),mod.UIAnchor.Center)
}
function ObjectiveLetters() {


 mod.SetVariable(UniqueUI3GlobalVar,mod.EmptyArray())
 mod.SetVariable(ObjectiveTrackingUIGlobalVar,mod.EmptyArray())
 AppendToArray("A")
 AppendToArray("B")
 AppendToArray("C")
 AppendToArray("D")
 AppendToArray("E")
 AppendToArray("F")
 AppendToArray("G")
 AppendToArray("H")
 AppendToArray("I")
 AppendToArray("J")
 AppendToArray("K")
 AppendToArray("L")
 AppendToArray("M")
 AppendToArray("N")
 AppendToArray("O")
 AppendToArray("P")
 AppendToArray("Q")
 AppendToArray("R")
 AppendToArray("S")
 AppendToArray("T")
 AppendToArray("U")
 AppendToArray("V")
 AppendToArray("W")
 AppendToArray("X")
 AppendToArray("Y")
 AppendToArray("Z")
 mod.SetVariable(UniqueUI3GlobalVar,mod.GetVariable(ObjectiveTrackingUIGlobalVar))
}
function ObjectiveTeamUI_Array() {


 mod.SetVariable(StartingScoreGlobalVar,mod.EmptyArray())
 mod.SetVariable(ObjectiveTrackingUIGlobalVar,mod.EmptyArray())
 AppendToArray("A1")
 AppendToArray("B1")
 AppendToArray("C1")
 AppendToArray("D1")
 AppendToArray("E1")
 AppendToArray("F1")
 AppendToArray("G1")
 AppendToArray("H1")
 AppendToArray("I1")
 AppendToArray("J1")
 AppendToArray("K1")
 AppendToArray("L1")
 AppendToArray("M1")
 AppendToArray("N1")
 AppendToArray("O1")
 AppendToArray("P1")
 AppendToArray("Q1")
 AppendToArray("R1")
 AppendToArray("S1")
 AppendToArray("T1")
 AppendToArray("U1")
 AppendToArray("V1")
 AppendToArray("W1")
 AppendToArray("X1")
 AppendToArray("Y1")
 AppendToArray("Z1")
 AppendToArray("A2")
 AppendToArray("B2")
 AppendToArray("C2")
 AppendToArray("D2")
 AppendToArray("E2")
 AppendToArray("F2")
 AppendToArray("G2")
 AppendToArray("H2")
 AppendToArray("I2")
 AppendToArray("J2")
 AppendToArray("K2")
 AppendToArray("L2")
 AppendToArray("M2")
 AppendToArray("N2")
 AppendToArray("O2")
 AppendToArray("P2")
 AppendToArray("Q2")
 AppendToArray("R2")
 AppendToArray("S2")
 AppendToArray("T2")
 AppendToArray("U2")
 AppendToArray("V2")
 AppendToArray("W2")
 AppendToArray("X2")
 AppendToArray("Y2")
 AppendToArray("Z2")
 mod.SetVariable(StartingScoreGlobalVar,mod.GetVariable(ObjectiveTrackingUIGlobalVar))
}
// global vars
const ScorePositionLeftGlobalVar = mod.GlobalVariable(0)
const EnemyTextColourGlobalVar = mod.GlobalVariable(1)
const UniqueBackground_IDGlobalVar = mod.GlobalVariable(2)
const UniqueUI_IDGlobalVar = mod.GlobalVariable(3)
const EnemyBGColourGlobalVar = mod.GlobalVariable(4)
const FriendlyTextColourGlobalVar = mod.GlobalVariable(5)
const GameOngoingGlobalVar = mod.GlobalVariable(6)
const PlayersOnObjectiveGlobalVar = mod.GlobalVariable(7)
const iteratorGlobalVar = mod.GlobalVariable(8)
const ScorePositionRightGlobalVar = mod.GlobalVariable(9)
const FriendlyBGColourGlobalVar = mod.GlobalVariable(10)
const UniqueUI4GlobalVar = mod.GlobalVariable(11)
const UniqueUI3GlobalVar = mod.GlobalVariable(12)
const StartingScoreGlobalVar = mod.GlobalVariable(13)
const FlagLettersGlobalVar = mod.GlobalVariable(14)
const ObjectiveTrackingUIGlobalVar = mod.GlobalVariable(15)
const SecondsGlobalVar = mod.GlobalVariable(16)
const AppendGlobalVar = mod.GlobalVariable(17)

// player vars
const CapturesPlayerVar = 0;
const OnPointPlayerVar = 1;
const KillAssistsPlayerVar = 2;
const UI_IDTextPlayerVar = 3;
const ScorePlayerVar = 4;
const RevivesPlayerVar = 5;
const UI_OutlinePlayerVar = 6;

// team vars
const TeamScoreTeamVar = 0;
const OtherTeamTeamVar = 1;

// capture point vars

// mcom vars

// vehicle vars

export function OngoingGlobal() {
const eventInfo = {};
let eventNum = 0;
  OngoingGlobal_Initialise(modlib.getGlobalCondition(eventNum++));
  OngoingGlobal_Update_Score_and_Time(modlib.getGlobalCondition(eventNum++));
  OngoingGlobal_Update_Score_and_Time1(modlib.getGlobalCondition(eventNum++));
  OngoingGlobal_Score_tracker(modlib.getGlobalCondition(eventNum++));
  OngoingGlobal_End_Game(modlib.getGlobalCondition(eventNum++));
}

export function OnGameModeStarted() {
const eventInfo = {};
let eventNum = 5;
  OnGameModeStarted_MapSetup(modlib.getGlobalCondition(eventNum++));
}

export function OnPlayerEarnedKill(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock) {
const eventInfo = {eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock};
let eventNum = 0;
  OnPlayerEarnedKill_Ean_Kill(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnPlayerEarnedKillAssist(eventPlayer: mod.Player, eventOtherPlayer: mod.Player) {
const eventInfo = {eventPlayer, eventOtherPlayer};
let eventNum = 1;
  OnPlayerEarnedKillAssist_Kill_assist(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnRevived(eventPlayer: mod.Player, eventOtherPlayer: mod.Player) {
const eventInfo = {eventPlayer, eventOtherPlayer};
let eventNum = 2;
  OnRevived_Revive_Counter(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnPlayerJoinGame(eventPlayer: mod.Player) {
const eventInfo = {eventPlayer};
let eventNum = 3;
  OnPlayerJoinGame_Sets_Scoreboard(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnPlayerUndeploy(eventPlayer: mod.Player) {
const eventInfo = {eventPlayer};
let eventNum = 4;
  OnPlayerUndeploy_Death_Update(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnCapturePointCaptured(eventCapturePoint: mod.CapturePoint) {
const eventInfo = {eventCapturePoint};
let eventNum = 0;
  OnCapturePointCaptured_On_Capture(modlib.getCapturePointCondition(eventCapturePoint, eventNum++), eventInfo);
}

export function OnCapturePointCapturing(eventCapturePoint: mod.CapturePoint) {
const eventInfo = {eventCapturePoint};
let eventNum = 1;
  OnCapturePointCapturing_Bug_fix_for_capture_times(modlib.getCapturePointCondition(eventCapturePoint, eventNum++), eventInfo);
}

export function OnPlayerEnterCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
const eventInfo = {eventPlayer, eventCapturePoint};
let eventNum = 5;
  OnPlayerEnterCapturePoint_CapturePoint_UI(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}

export function OnPlayerExitCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
const eventInfo = {eventPlayer, eventCapturePoint};
let eventNum = 6;
  OnPlayerExitCapturePoint_Remove_CapturePoint_UI(modlib.getPlayerCondition(eventPlayer, eventNum++), eventInfo);
}


// Strings content - add the following to your strings file: 

{
  "s0": "UniquePlayerUI1",
  "s1": "UniquePlayerUI2",
  "s2": "ObjectiveLetters",
  "s3": "ObjectiveTeamUI_Array",
  "s4": "Scoreboard",
  "s5": "CapturePointSetup",
  "s6": "UpdatePlayerScoreboard",
  "s7": "MainUI_ScoreandTime",
  "s8": "ObjectiveCapturedPlayerData",
  "s9": "ObjectiveVehicleSpawn",
  "s10": "VoiceOverEvents2D",
  "s11": "ObjectiveCaptured",
  "s12": "VoiceOverFlags",
  "s13": "Alpha",
  "s14": "ObjectiveCapturedEnemy",
  "s15": "Timer",
  "s16": "Team1LeftBar",
  "s17": "Team1RightBar",
  "s18": "Team2LeftBar",
  "s19": "Team2RightBar",
  "s20": "EndGame_UI",
  "s21": "Team1ScoreLeft",
  "s22": "Team1ScoreRight",
  "s23": "Team2ScoreLeft",
  "s24": "Team2ScoreRight",
  "s25": "UIAnchor",
  "s26": "TopCenter",
  "s27": "",
  "s28": "UIBgFill",
  "s29": "Blur",
  "s30": "UIDepth",
  "s31": "BelowGameUI",
  "s32": "OutlineThin",
  "s33": "AboveGameUI",
  "s34": "Center",
  "s35": "ObjectiveUI",
  "s36": "Defending  {} - {}",
  "s37": "Capturing  {} - {}",
  "s38": "Secured  {} - {}",
  "s39": "Contested  {} - {}",
  "s40": "0",
  "s41": "Score",
  "s42": "Kills",
  "s43": "Deaths",
  "s44": "Assists",
  "s45": "Captures",
  "s46": "{}",
  "s47": "{} : {}{}",
  "s48": "Maps",
  "s49": "Abbasid",
  "s50": "AppendToArray",
  "s51": "1",
  "s52": "2",
  "s53": "3",
  "s54": "4",
  "s55": "5",
  "s56": "6",
  "s57": "7",
  "s58": "8",
  "s59": "9",
  "s60": "10",
  "s61": "11",
  "s62": "12",
  "s63": "13",
  "s64": "14",
  "s65": "15",
  "s66": "16",
  "s67": "17",
  "s68": "18",
  "s69": "19",
  "s70": "20",
  "s71": "21",
  "s72": "22",
  "s73": "23",
  "s74": "24",
  "s75": "25",
  "s76": "26",
  "s77": "27",
  "s78": "28",
  "s79": "29",
  "s80": "30",
  "s81": "31",
  "s82": "32",
  "s83": "33",
  "s84": "34",
  "s85": "35",
  "s86": "36",
  "s87": "37",
  "s88": "38",
  "s89": "39",
  "s90": "40",
  "s91": "41",
  "s92": "42",
  "s93": "43",
  "s94": "44",
  "s95": "45",
  "s96": "46",
  "s97": "47",
  "s98": "48",
  "s99": "49",
  "s100": "50",
  "s101": "51",
  "s102": "52",
  "s103": "53",
  "s104": "54",
  "s105": "55",
  "s106": "56",
  "s107": "57",
  "s108": "58",
  "s109": "59",
  "s110": "60",
  "s111": "61",
  "s112": "62",
  "s113": "63",
  "s114": "64",
  "s115": "ID1",
  "s116": "ID2",
  "s117": "ID3",
  "s118": "ID4",
  "s119": "ID5",
  "s120": "ID6",
  "s121": "ID7",
  "s122": "ID8",
  "s123": "ID9",
  "s124": "ID10",
  "s125": "ID11",
  "s126": "ID12",
  "s127": "ID13",
  "s128": "ID14",
  "s129": "ID15",
  "s130": "ID16",
  "s131": "UID17",
  "s132": "ID18",
  "s133": "ID19",
  "s134": "ID20",
  "s135": "ID21",
  "s136": "ID22",
  "s137": "ID23",
  "s138": "ID24",
  "s139": "ID25",
  "s140": "ID26",
  "s141": "ID27",
  "s142": "ID28",
  "s143": "ID29",
  "s144": "ID30",
  "s145": "ID31",
  "s146": "ID32",
  "s147": "ID33",
  "s148": "ID34",
  "s149": "ID35",
  "s150": "ID36",
  "s151": "ID37",
  "s152": "ID38",
  "s153": "ID39",
  "s154": "ID40",
  "s155": "ID41",
  "s156": "ID42",
  "s157": "ID43",
  "s158": "ID44",
  "s159": "ID45",
  "s160": "ID46",
  "s161": "ID47",
  "s162": "ID48",
  "s163": "ID49",
  "s164": "ID50",
  "s165": "ID51",
  "s166": "ID52",
  "s167": "ID53",
  "s168": "ID54",
  "s169": "ID55",
  "s170": "ID56",
  "s171": "ID57",
  "s172": "ID58",
  "s173": "ID59",
  "s174": "ID60",
  "s175": "ID61",
  "s176": "ID62",
  "s177": "ID63",
  "s178": "ID64",
  "s179": "{} : {}",
  "s180": "TeamUI_Setup",
  "s181": "LeftBarBG",
  "s182": "RightBarBG",
  "s183": "UI_BarSetup",
  "s184": "UI_ScoreSetup",
  "s185": "Solid",
  "s186": "A",
  "s187": "B",
  "s188": "C",
  "s189": "D",
  "s190": "E",
  "s191": "F",
  "s192": "G",
  "s193": "H",
  "s194": "I",
  "s195": "J",
  "s196": "K",
  "s197": "L",
  "s198": "M",
  "s199": "N",
  "s200": "O",
  "s201": "P",
  "s202": "Q",
  "s203": "R",
  "s204": "S",
  "s205": "T",
  "s206": "U",
  "s207": "V",
  "s208": "W",
  "s209": "X",
  "s210": "Y",
  "s211": "Z",
  "s212": "A1",
  "s213": "B1",
  "s214": "C1",
  "s215": "D1",
  "s216": "E1",
  "s217": "F1",
  "s218": "G1",
  "s219": "H1",
  "s220": "I1",
  "s221": "J1",
  "s222": "K1",
  "s223": "L1",
  "s224": "M1",
  "s225": "N1",
  "s226": "O1",
  "s227": "P1",
  "s228": "Q1",
  "s229": "R1",
  "s230": "S1",
  "s231": "T1",
  "s232": "U1",
  "s233": "V1",
  "s234": "W1",
  "s235": "X1",
  "s236": "Y1",
  "s237": "Z1",
  "s238": "A2",
  "s239": "B2",
  "s240": "C2",
  "s241": "D2",
  "s242": "E2",
  "s243": "F2",
  "s244": "G2",
  "s245": "H2",
  "s246": "I2",
  "s247": "J2",
  "s248": "K2",
  "s249": "L2",
  "s250": "M2",
  "s251": "N2",
  "s252": "O2",
  "s253": "P2",
  "s254": "Q2",
  "s255": "R2",
  "s256": "S2",
  "s257": "T2",
  "s258": "U2",
  "s259": "V2",
  "s260": "W2",
  "s261": "X2",
  "s262": "Y2",
  "s263": "Z2"
}