kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

const MOVE_SPEED = 120;

loadRoot("https://i.imgur.com/"); //이미지의 Root를 정함
loadSprite("link-going-left", "1Xq9biB.png");
loadSprite("link-going-right", "yZIb8O2.png");
loadSprite("link-going-down", "r377FIM.png");
loadSprite("link-going-up", "UkV0we0.png");
loadSprite("left-wall", "rfDoaa1.png");
loadSprite("top-wall", "QA257Bj.png");
loadSprite("bottom-wall", "vWJWmvb.png");
loadSprite("right-wall", "SmHhgUn.png");
loadSprite("bottom-left-wall", "awnTfNC.png");
loadSprite("bottom-right-wall", "84oyTFy.png");
loadSprite("top-left-wall", "xlpUxIm.png");
loadSprite("top-right-wall", "z0OmBd1.png");
loadSprite("top-door", "U9nre4n.png");
loadSprite("left-door", "okdJNls.png");
loadSprite("fire-pot", "I7xSp7w.png");
loadSprite("lanterns", "wiSiY09.png");
loadSprite("slicer", "c6JFi5Z.png");
loadSprite("skeletor", "Ei1VnX8.png");
loadSprite("kaboom", "o9WizfI.png");
loadSprite("stairs", "VghkL08.png");
loadSprite("bg", "u4DVsx6.png");

scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");
  const maps = [
    [
      "wcc{ccqccl",
      "a        b",
      "a    e   b",
      "a      * b",
      "z        b",
      "a    e   b",
      "a *      b",
      "a        b",
      "xdd{dd{ddy",
    ],
    [
      "scc{ccqccl",
      "a        b",
      "{        b",
      "a      } b",
      "a        {",
      "a        b",
      "a    s   b",
      "a        {",
      "wddddddddy",
    ],
  ];

  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite("left-wall"), solid(), "wall"],
    b: [sprite("right-wall"), solid(), , "wall"],
    c: [sprite("top-wall"), solid(), , "wall"],
    d: [sprite("bottom-wall"), solid(), , "wall"],
    l: [sprite("top-right-wall"), solid(), "wall"],
    y: [sprite("bottom-right-wall"), solid(), "wall"],
    w: [sprite("top-left-wall"), solid(), "wall"],
    x: [sprite("bottom-left-wall"), solid(), "wall"],
    y: [sprite("bottom-right-wall"), solid(), "wall"],
    z: [sprite("left-door"), solid(), "wall", "door"],
    q: [sprite("top-door"), "next-level", "wall"],
    s: [sprite("stairs"), "next-level"],
    "*": [sprite("slicer"), "slicer", { dir: -1 }, "dangerous"],
    "}": [sprite("skeletor"), "skeletor", { dir: -1, timer: 0 }, "dangerous"],
    "{": [sprite("lanterns"), solid()],
    e: [sprite("fire-pot"), solid()], //solid : 고정, 지나갈 수 없음
  };

  addLevel(maps[level], levelCfg);

  add([sprite("bg"), layer("bg")]);

  const scoreLable = add([
    text("0"),
    pos(400, 450),
    layer("ui"),
    {
      value: score,
    },
    scale(2),
  ]);

  add([text("level " + parseInt(level + 1)), pos(400, 485), scale(2)]);

  const player = add([
    sprite("link-going-right"),
    pos(5, 190),
    {
      dir: vec2(1, 0), //기본 오른쪽으로 간다
    },
  ]);

  player.action(() => {
    player.resolve();
  }); //문에 안끼어있음

  player.overlaps("next-level", () => {
    go("game", {
      level: level + 1,
      score: scoreLable.value,
    });
  });
  keyDown("left", () => {
    player.changeSprite("link-going-left");
    player.move(-MOVE_SPEED, 0); //속도 오른쪽, 위아래
    player.dir = vec2(-1, 0);
  });
  keyDown("right", () => {
    player.changeSprite("link-going-right");
    player.move(MOVE_SPEED, 0); //속도 오른쪽, 위아래
    player.dir = vec2(1, 0);
  });
  keyDown("up", () => {
    player.changeSprite("link-going-up");
    player.move(0, -MOVE_SPEED); //속도 양수 : 오, 아, 음수 : 왼, 위
    player.dir = vec2(0, -1);
  });
  keyDown("down", () => {
    player.changeSprite("link-going-down");
    player.move(0, MOVE_SPEED); //속도 오른쪽, 위아래
    player.dir = vec2(0, 1);
  });

  function spawnKaboom(p) {
    const obj = add([sprite("kaboom"), pos(p), "kaboom"]);
    wait(0.5, () => {
      destroy(obj);
    });
  }
  keyPress("space", () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)));
  });

  collides("kaboom", "skeletor", (k, s) => {
    camShake(4);
    wait(1, () => {
      destroy(k);
    });
    destroy(s);
    scoreLable.value += 100;
    scoreLable.text = scoreLable.value;
  });

  const SLICER_SPEED = 100;

  action("slicer", (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  });

  collides("dangerous", "wall", (s) => {
    s.dir = -s.dir;
  });
  const SKELETOR_SPEED = 60;

  action("skeletor", (s) => {
    s.move(0, s.dir * SKELETOR_SPEED);
    s.timer -= dt();
    if (s.timer <= 0) {
      s.dir = -s.dir;
      s.timer = rand(7);
    }
  });
  player.collides("door", (d) => {
    d.changeSprite("left-wall");
  });
  player.overlaps("dangerous", () => {
    go("lose", { score: scoreLable.value });
  });
});

scene("lose", ({ score }) => {
  add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
});

start("game", { level: 0, score: 0 });
