const client = () => {
  console.log("Welcome to Valid client");
  customInit();
};

const customInit = () => {
  customOnLeaveCallback();
  startCustomSolo();
  customTransition();
  customMatchFoundAnimation();
  customDeathMessage();
  removeEmoteHint();
  fixAdPreroll();
  reduceMessageFix();
  shopFix();
  scoreboardFix();
  weaponSelectionFix();
  //validVerified();
  playMenuMusic();
  //fix();
  //bugfix();
};

// Functionality modifications

const messageFix = () => {
  RoomManager.prototype.rematchmaking = function() {
      this.time = 0,
      console.log("Rematchmaking..."),
      this.app.fire("RoomManager:Leave", !0),
      this.app.fire("Analytics:Event", "Room", "Rematchmaking"),
      this.matchmakingTitle.element.text = "Searching for players...",
      this.matchmakingCancel.enabled = !0,
      setTimeout(function(t) {
          t.startMatchmaking()
      }, 25, this)
  }
}



const customOnLeaveCallback = () => {
  Player.prototype.onLeave = function () {
    this.app.mouse.disablePointerLock(),
      Utils.isMobile()
        ? (window.location.href =
            "https://beta-meta-42746.venge.io/?isMobile=yes&v=" + Math.random())
        : (window.location.href = "index.html");
  };
};

const startCustomSolo = () => {
    RoomManager.prototype.onStart = function() {
      this.app.fire("Analytics:Event", "Invite", "TriedToStart"),
      this.send([this.keys.start]),
      this.app.fire("Analytics:Event", "Invite", "Start")
  }
}

const customTransition = () => {
  Overlay.prototype.onTransition = function (t) {
    t
      ? ((this.leftCinema.element.color = t),
        (this.rightCinema.element.color = t))
      : ((this.leftCinema.element.color = pc.colors.black),
        (this.rightCinema.element.color = pc.colors.black)),
      (this.leftCinema.enabled = !0),
      (this.rightCinema.enabled = !0),
      (this.entity.sound.slots.Whoosh.pitch = 1.1),
      this.entity.sound.play("Whoosh"),
      this.leftCinema.setLocalEulerAngles(0, 0, 0),
      this.leftCinema.setLocalScale(0.1, 0, 0),
      this.leftCinema
        .tween(this.leftCinema.getLocalScale())
        .to({ x: 1.4, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
        .start(),
      this.rightCinema.setLocalEulerAngles(0, 0, 0),
      this.rightCinema.setLocalScale(0.1, 0, 0),
      this.rightCinema
        .tween(this.rightCinema.getLocalScale())
        .to({ x: 1.4, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
        .start(),
      setTimeout(
        function (t) {
          t.leftCinema.setLocalEulerAngles(0, 0, 0),
          t.leftCinema
            .tween(t.leftCinema.getLocalScale())
            .to({ x: 0.1, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
            .start(),
          t.rightCinema.setLocalEulerAngles(0, 0, 0),
          t.rightCinema
            .tween(t.rightCinema.getLocalScale())
            .to({ x: 0.1, y: 1, z: 1 }, 0.35, pc.QuarticInOut)
            .start(),
          (t.entity.sound.slots.Whoosh.pitch = 1),
          t.entity.sound.play("Whoosh");
        },
        400,
        this
      );
  };
};

const customMatchFoundAnimation = () => {
  Menu.prototype.onMatchFound = function () {
    (this.isMatchFound = !0),
      (this.app.scene.layers.getLayerByName("Lightroom").enabled = !1),
      (this.app.scene.layers.getLayerByName("Lightroom-Top").enabled = !1),
      clearTimeout(this.bannerTimeout),
      this.app.fire("Ads:BannerDestroy", "venge-io_728x90", "728x90"),
      this.app.fire("DOM:Clear", !0),
      this.app.off("Player:Character"),
      this.app.fire("Popup:Close", !0),
      (this.matchFoundBackground.enabled = !0),
      this.matchFoundBackground
        .tween(this.matchFoundBackground.element)
        .to({ opacity: 1 }, 1, pc.QuarticOut)
        .start(),
      (this.matchFoundRectangle.element.opacity = 1),
      this.matchFoundRectangle.setLocalScale(0, 0, 0),
      this.matchFoundCenter.setLocalScale(3, 3, 3),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.getLocalScale())
        .to({ x: 1, y: 1, z: 1 }, 0.5, pc.QuarticOut)
        .start(),
      this.matchFoundRectangle
        .tween(this.matchFoundRectangle.element)
        .to({ opacity: 0.1 }, 0.5, pc.QuarticOut)
        .start(),
      this.matchFoundCenter
        .tween(this.matchFoundCenter.getLocalScale())
        .to({ x: 1.2, y: 1.2, z: 1.2 }, 2, pc.QuarticOut)
        .start(),
      setTimeout(
        function (e) {
          (e.matchFoundLoading.enabled = !0),
            e.matchFoundRectangle
              .tween(e.matchFoundRectangle.element)
              .to({ opacity: 0 }, 0.5, pc.QuarticOut)
              .start(),
            e.matchFoundText
              .tween(e.matchFoundText.element)
              .to({ opacity: 0 }, 0.5, pc.QuarticOut)
              .start(),
            setTimeout(function () {
              pc.app.fire("Game:Connect", !0);
            }, 1300);
        },
        1500,
        this
      );
  };
};

const customDeathMessage = () => {
  Player.prototype.setDeath = function (t, e) {
    if (
      ((this.killedBy = t),
      (this.isDeath = !0),
      this.deathCount++,
      this.app.fire("Digit:DeathCount", this.deathCount),
      this.movement.death(),
      (this.characterHolder.enabled = !0),
      this.characterEntity.setLocalEulerAngles(0, this.movement.lookX, 0),
      setTimeout(
        function (t) {
          t.movement.lookEntity.enabled = !1;
        },
        100,
        this
      ),
      this.characterEntity.setLocalPosition(0, -2.15, 0),
      (this.characterEntity.animation.speed = 1),
      "Drown" == e
        ? (this.characterEntity.animation.play("Floating"),
          (this.characterEntity.animation.speed = 3),
          (this.characterEntity.animation.loop = !0),
          this.entity.sound.play("Splash"),
          this.characterEntity.setLocalPosition(0, -3.5, 0),
          this.characterEntity
            .tween(this.characterEntity.getLocalPosition())
            .to({ x: 0, y: -6.5, z: 0 }, 2, pc.Linear)
            .start())
        : (this.characterEntity.animation.play("Death"),
          (this.characterEntity.animation.loop = !1)),
      (this.characterCamera.script.blackWhite.enabled = !0),
      this.characterCamera.setLocalPosition(0, 1.215, -0.115),
      this.characterCamera
        .tween(this.characterCamera.getLocalPosition())
        .to({ x: 0, y: 3.015, z: 7 }, 1, pc.SineOut)
        .start(),
      this.characterCamera.setLocalEulerAngles(0, 0, 0),
      this.characterCamera
        .tween(this.characterCamera.getLocalEulerAngles())
        .rotate({ x: -18, y: 0, z: 0 }, 0.7, pc.BackOut)
        .start(),
      this.interface.hideGameplay(),
      this.killedBy && this.killedBy != this.entity)
    ) {
      var a = this.killedBy.script.enemy.username;
      this.app.fire(
        "Overlay:Status",
        'Eliminated by [color="#FF0000"]' + a + "[/color]"
      );
    }
    this.app.fire("Player:StopSpeaking", !0),
      this.showCircularMenu(),
      "undefined" != typeof PokiSDK && PokiSDK.gameplayStop();
  };
};

const removeEmoteHint = () => {
  Player.prototype.onKill = function(t, e) {
    this.app.fire("Player:Frag", !0),
    "Capture" != e && "Suicide" != e && (this.killCount++,
    this.app.fire("Digit:KillCount", this.killCount)),
    setTimeout(function(t) {
        t.movement.inspect()
    }, 1e3, this)
}
};

const fixAdPreroll = () => {
    NetworkManager.prototype.mode = function(e) {
      var t = e[1];
      e[0] && (this.lastMode = this.currentMode + "",
      this.currentMode = e[0],
      pc.currentMode = this.currentMode,
      pc.isPrivate = e[2],
      this.app.fire("Game:Mode", this.currentMode, t)),
      this.setModeState(this.lastMode, !1),
      this.setModeState(this.currentMode, !0);
      var i = this.app.root.findByName("Result");
      if (i) {
          var a = this.app.root.findByName("ChatWrapper");
          a && (a.setLocalPosition(0, 0, 0),
          a.reparent(this.app.root.findByName("ChatGame"))),
          i.destroy()
      }
      if (this.app.fire("Game:PreStart", !0),
      this.app.fire("Outline:Restart", !0),
      pc.currentMap = t,
      clearTimeout(this.mapTimer),
      this.mapTimer = setTimeout(function(e) {
          t ? e.app.fire("Map:Load", t) : e.app.fire("Map:Load", "Sierra")
      }, 100, this),
      pc.isFinished = !1,
      pc.isPauseActive = !1,
      this.isTeamSelected = !1,
      this.app.fire("Game:Start", !0),
      this.app.fire("Player:Lock", !0),
      "GUNGAME" != pc.currentMode && pc.session && pc.session.weapon && this.app.fire("WeaponManager:Set", pc.session.weapon),
      setTimeout(function(e) {
          e.app.fire("DOM:Update", !0)
      }, 500, this),
      Date.now() - this.lastGameStart > 1e5) {
          var r = this;
          this.app.fire("Player:Hide", !0)
          //this.app.fire("Ads:Preroll", function() {
          //    r.app.fire("Player:Show", !0)
          }
      }
  }

const reduceMessageFix = () => {
    SpellManager.prototype.applyReduce = function() {
      this.isReducedApplied || ("Lilium" == this.characterName ? this.player.throwCooldown = 7 : "Shin" == this.characterName && (this.player.throwCooldown = 2),
      this.isReducedApplied = !0)
  }
}

//Shop fix
const shopFix = () => {
    Shop.prototype.onTransactionToken = function(t) {
      if (!t || !0 !== t.success)
          return !1;
      if ("mobile_3ce5" == t.token)
          return this.lastSelectedSKU = t.sku,
          window.webkit.messageHandlers.iosListener.postMessage("buy:" + t.sku),
          !1;
      var e = {
          access_token: t.token
      }
        , i = this
        , o = document.createElement("script");
      o.type = "text/javascript",
      o.async = !0,
      o.src = "https://static.xsolla.com/embed/paystation/1.0.7/widget.min.js",
      o.addEventListener("load", function(t) {
          XPayStationWidget.init(e),
          setTimeout(function() {
              i.buyButton.enabled = !0,
              XPayStationWidget.open()
          }, 100)
      }, !1),
      document.getElementsByTagName("head")[0].appendChild(o)
  }
}

const scoreboardFix = () => {
    Overlay.prototype.onStart = function() {
      this.app.fire("Overlay:Gameplay", !0),
      this.clearAbilityList(),
      this.abilityBar.setLocalScale(1, .001, 1),
      this.abilityHolderEntity.enabled = !1,
      this.skillIcon.enabled = !0,
      this.abilityNotification.enabled = !1,
      this.abilityBuyClock.enabled = !0,
      this.abilityBuyKey.enabled = !1,
      this.abilityBuyButton.findByName("TierLevel").element.color = pc.colors.gray,
      this.abilityBuyButton.findByName("Thumbnail").element.color = pc.colors.gray,
      this.isAbilitySelected = !1,
      this.isOvertime = !1
      this.app.fire("Overlay:PlayerStats", !1)
  }
  ,
  Overlay.prototype.onFinish = function() {
      this.pauseEntity.enabled = !1,
      pc.isPauseActive = !1,
      this.taskEntity.enabled = !1,
      this.achievementEntity.enabled = !1,
      this.focusBulletsEntity.enabled = !1,
      this.cardEntity.enabled = !1,
      this.entity.sound.stop("Card-Selection-Loop"),
      this.entity.sound.stop("Overtime-Loop"),
      this.abilities = [],
      this.hideAllGameplay(),
      this.app.fire("Overlay:PlayerStats", !1)
  }
}

//Fix Weapon Selection
const weaponSelectionFix = () => {
    Menu.prototype.onWeaponSelect = function(e) {
      var t = this.weaponEntity.findByTag("Weapon")
        , n = this.app.assets.find(e + "-Thumbnail-White.png");
      for (var i in t) {
          t[i].enabled = !1
      }
      this.weaponIcon.element.textureAsset = n,
      this.weaponName.element.text = e.toLowerCase(),
      this.entity.sound.play("Whoosh"),
      pc.session.weapon = e
  }
}

const validVerified = () => {
    Overlay.prototype.setLeaderboard = function(t) {
      for (var e = this.leaderboardItems.length; e--; )
          this.leaderboardItems[e].destroy();
      this.leaderboardItems = [],
      this.stats = t;
      var i = 1.3
        , a = 0
        , n = 0;
      for (var s in t) {
          var o = t[s]
            , l = parseInt(s)
            , r = this.app.assets.find("Tier-" + o.tier + ".png");
          "GUNGAME" == pc.currentMode && (r = this.app.assets.find("Rank-" + o.tier + ".png"));
          var y = this.leaderboardItem.clone();
          y.enabled = !0,
          y.setLocalPosition(-3 * parseInt(s), a, 0),
          y.setLocalScale(i, i, i),
          y.findByName("Bar").setLocalScale(o.bar, 1, 1),
          y.findByName("Tier").element.textureAsset = r,
          y.findByName("Rank").element.text = l + 1 + ".",
          y.findByName("Username").element.text = Utils.displayUsername(o.username),
          "red" == o.team ? (y.findByName("Team").element.color = pc.colors.redTeam,
          y.findByName("Team").enabled = !0) : "blue" == o.team ? (y.findByName("Team").element.color = pc.colors.blueTeam,
          y.findByName("Team").enabled = !0) : y.findByName("Team").enabled = !1,
          o.isMe && (y.findByName("Username").element.color = pc.colors.me,
          y.findByName("Leader").element.color = pc.colors.me,
          n = l),
          o.verified ? (y.findByName("Username").findByName("Verified").enabled = !0,
          y.findByName("Username").setLocalPosition(55, -7, 0),
          y.element.width = y.findByName("Username").element.width + 70 + 20) : y.element.width = y.findByName("Username").element.width + 70,
          y.findByName("Leader").enabled = 0 === l;

          var name = cLen(y.findByName("Username").element.text);
          if (name in window.verified) {
              var icon = pc.app.assets.find('Verified-Icon-valid.png');

              var us = y.findByName("Username"),
                  isverif = us.findByName("Verified").enabled,
                  own = us.findByName("Verified").clone();
              own.element.textureAsset = icon
              own.enabled = 1;
              own.name = "NeXi";
              us.addChild(own);
              if (isverif) us.findByName('NeXi').setLocalPosition(-40,0,0)
              us.setLocalPosition(isverif ? 72 : 50, -7, 0);
              y.findByName("Leader").enabled = 0;
          }

          this.leaderboardEntity.addChild(y),
          this.leaderboardItems.push(y),
          a += -45 * (i -= .15) - 10
      }
      this.leaderboardEntity.element.height = 50 - a,
      this.myLastRank != n && (0 === n && 0 !== this.myLastRank && this.app.fire("Overlay:Subtitle", "You are the leader now!"),
      0 === this.myLastRank && 0 !== n && this.app.fire("Overlay:Subtitle", "You are no longer leader."),
      this.myLastRank = n)
  }

  Overlay.prototype.setPausePlayers = function(t) {
      this.clearPausePlayers();
      var e = this.pauseEntity.findByName("Content")
        , i = this.pauseEntity.findByName("Row");
      for (var a in t) {
          var n = t[a]
            , s = 38 * -parseInt(a)
            , o = this.app.assets.find("Tier-" + n.tier + ".png");
          "GUNGAME" == pc.currentMode && (o = this.app.assets.find("Rank-" + n.tier + ".png"));
          var l = this.app.assets.find(n.skin + "-Thumbnail-3")
            , r = i.clone();
          r.enabled = !0,
          r.setLocalPosition(0, s, 0),
          r.findByName("Username").element.text = Utils.displayUsername(n.username),
          r.findByName("Kill").element.text = n.kill + "",
          r.findByName("Death").element.text = n.death + "",
          r.findByName("Score").element.text = n.score + "",
          r.findByName("Tier").element.textureAsset = o,
          r.findByName("Character").element.textureAsset = l,
          n.verified && (r.findByName("Username").findByName("Verified").enabled = !0,
          r.findByName("Username").setLocalPosition(65, 0, 0));
          
          var name = cLen(r.findByName("Username").element.text);
          if (name in window.verified) {
              var icon = pc.app.assets.find('Verified-Icon-valid.png');

              var us = r.findByName("Username"),
                  isverif = us.findByName("Verified").enabled,
                  own = us.findByName("Verified").clone();
              own.element.textureAsset = icon
              own.enabled = 1;
              own.name = "NeXi";
              us.addChild(own);
              if (isverif) us.findByName('NeXi').setLocalPosition(-40,0,0);
              us.setLocalPosition(isverif ? 85 : 65, 0, 0);
          }
          this.pausePlayers.push(r),
          e.addChild(r)
      }
  }
  
  Overlay.prototype.setPlayerStats = function(t) {
      this.clearPlayerStats();
      var e = this.playerStatsEntity.findByName("Content")
        , i = this.playerStatsEntity.findByName("Row");
      for (var a in t) {
          var n = t[a]
            , s = 38 * -parseInt(a)
            , o = this.app.assets.find("Tier-" + n.tier + ".png");
          "GUNGAME" == pc.currentMode && (o = this.app.assets.find("Rank-" + n.tier + ".png"));
          var l = this.app.assets.find(n.skin + "-Thumbnail-3")
            , r = i.clone();
          r.enabled = !0;
          r.setLocalPosition(0, s, 0);
          r.findByName("Username").element.text = Utils.displayUsername(n.username);
          r.findByName("Kill").element.text = n.kill + "";
          r.findByName("Death").element.text = n.death + "";
          r.findByName("Score").element.text = n.score + "";
          r.findByName("Tier").element.textureAsset = o;
          r.findByName("Character").element.textureAsset = l;
          n.verified && (r.findByName("Username").findByName("Verified").enabled = !0, r.findByName("Username").setLocalPosition(65, 0, 0));

          var name = cLen(r.findByName("Username").element.text);
          if (name in window.verified) {
              var icon = pc.app.assets.find('Verified-Icon-valid.png');
              var us = r.findByName("Username"),
                  isverif = us.findByName("Verified").enabled,
                  own = us.findByName("Verified").clone();
              own.element.textureAsset = icon
              own.enabled = 1;
              own.name = "NeXi";
              us.addChild(own);
              if (isverif) us.findByName('NeXi').setLocalPosition(-40,0,0)
              us.setLocalPosition(isverif ? 80 : 60, 0, 0);
          }
          this.playerStats.push(r);
          e.addChild(r);
      }
  }
}

const playMenuMusic = () => {
    Menu.prototype.onWeaponSelect = function(e) {
      var t = this.weaponEntity.findByTag("Weapon")
        , n = this.app.assets.find(e + "-Thumbnail-White.png");
      for (var i in t) {
          t[i].enabled = !1
      }
      this.weaponEntity.findByName(e).enabled = !0,
      this.weaponIcon.element.textureAsset = n,
      this.weaponName.element.text = e.toLowerCase(),
      this.entity.sound.play("Whoosh"),
        setTimeout(function(t) {
          t.entity.sound.stop("Loop")
        }, 50, this)
      this.entity.sound.play("Loop"),
      pc.session.weapon = e
  }
  Menu.prototype.setMute = function() {
  }
}