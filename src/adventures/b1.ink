-> intro

=== function came_from(-> x)
	~ return TURNS_SINCE(x) == 0

VAR PARTY_SIZE = 6

=== function dice(count, size)
    { count > 0:
        ~ return RANDOM(1, size) + dice(count - 1, size)
    - else:
        ~ return 0
    }

=== function percentage(chance)
    ~ return RANDOM(1, 100) <= chance

VAR TURN_TIMER = 0

=== function new_turn
    @@TIME(turn=1)
    ~ TURN_TIMER += 1
    { TURN_TIMER % 3 == 0:
        ~ return check_random_encounter()
    - else:
        ~ return false
    }

=== function check_random_encounter
    ~ return RANDOM(1, 6) == 6

=== intro ===

= module
TODO Introduction to the Module.
    -> legends

= legends
~ temp legend_count = dice(PARTY_SIZE, 4) - PARTY_SIZE
{ legend_count > 0:
    You pool your knowledge of any legends or rumours about the place that you have heard:
    -> legend(legend_count)
- else:
    You each rack your brains for knowledge of the place, but you come up short.
    -> approach
}

= legend(count)
{ shuffle once:
    - • The name of the stronghold is Quasqueton.
    - • Zelligar had a wizard's workshop in the stronghold where he worked on magic stronger than any known to man.
    - • Rogahn owned a fantastic gem as big as a man's fist that was worth over 100,000 gold pieces; he kept it hidden in his personal quarters.
    - • Zelligar and Rogahn had orc slaves to do the menial work, and some lived permanently at the stronghold.
    - • The complex has two levels.
    - • Part of the complex is unfinished.
    - • The complex has a rear exit which is secret and well hidden.
    - • No outsiders have ever entered the complex and returned to tell the tale.
    - • Troglodytes have moved into the complex in the absence of its normal inhabitants.
    - • The place is protected by the gods themselves, and one member of any party of intruders is doomed to certain death.
    - • The treasures of Zelligar and Rogahn are safely hidden in a pool of water.
    - • The entire place is filled with guards left behind by Zelligar and Rogahn.
    - • Rogahn's trophy room has battle relics and slain monster remains from his adventures.
    - • There is a room with many pools of water within the complex.
    - • The very walls speak to visitors.
    - • An enchanted stone within the stronghold will grant a wish to anyone who chips off a piece of it and places it within their mouth.
    - • All treasures of Zelligar and Rogahn are cursed to bring ill to any who possess them.
    - • Zelligar and Rogahn have actually returned to their stronghold, and woe be to any unwelcome visitors!
    - • There are secret doors, rooms, and passageways in parts of the complex.
    - • The complex has more than one level.
}
{ count > 1: -> legend(count - 1) }
    -> approach

= approach
TODO approach to the castle

At the end of a treacherous pathway which leads up to the craggy outcropping of black rock, you see a cave-like opening, somewhat obscured by vegetation. Sweeping some of the vines and branches aside gives you a good view.
The opening leads straight into the rock formation, with a 10′ wide corridor leading the way to a large wooden door.

- (approach_door)
    * (examine) Examine the door.
        You notice that bits of wood have been chipped away from the edge, indicating that it has previously been forced. The door swings freely.
        -> approach_door

    * Go through the door.
        You open the door with no trouble and pass through.
        { not examine and percentage(10 * PARTY_SIZE): <> When you open it, you notice that bits of wood have been chipped away from the edge, indicating that it has previously been forced. }
        -> a1corridor

=== random_encounter ===
{ RANDOM(1, 6):
- 1: @@ENEMY(type="orc" count={RANDOM(1, 4)} hp=[6,4,3,1] mv=90 ml=8)
- 2: @@ENEMY(type="giant centipede" count={RANDOM(1, 2)} hp=[2,2])
- 3: @@ENEMY(type="kobold" count={RANDOM(1, 6)} hp=[4,3,3,2,2,1])
- 4: @@ENEMY(type="troglodyte" count={RANDOM(1, 2)} hp=[6,5])
- 5: @@ENEMY(type="giant rat" count={RANDOM(1, 4) + 1} hp=[4,3,2,1,1])
- 6: @@ENEMY(type="berserker" count={RANDOM(1, 2)} hp=[5,4] mv=90)
}
@@COMBAT()
->->

=== a1corridor ===

= enter
You are in a long, 10′ wide corridor with three sets of small alcoves. At one end of the corridor is a wooden door that leads outside while the other side has two stone steps going up to an intersection.
{new_turn(): -> random_encounter -> menu}
-> menu

= menu
    * Look at the first set of alcoves.
        This set of alcoves appears to be empty.

    * Look at the second set of alcoves.
        This set of alcoves appears to be empty.

    + Look at the third set of alcoves.
        { magic_mouth: There is no sign of the mouths that spoke to you before. -> menu }
        Just as you begin searching the alcoves, -> magic_mouth(-> menu)

    + Go up the steps.
        { magic_mouth: -> a1intersection }
        As you walk to the steps, -> magic_mouth(-> a1intersection)

- -> menu

= magic_mouth(-> destination)
    two mouths appear, one in each alcove. The east mouth speaks first, in a booming voice: "WHO DARES ENTER THIS PLACE AND INTRUDE UPON THE SANCTUARY OF ITS INHABITANTS?"
    After but a moment, and drowning out any attempted reply, comes the reply from the west mouth: "ONLY A GROUP OF FOOLHARDY EXPLORERS DOOMED TO CERTAIN DEATH!"
    Then both mouths shout in unison, "WOE TO AN WHO PASS THIS PLACE - THE WRATH OF ZELLIGAR AND ROGAHN WILL BE UPON THEM!"
    The mouths then begin laughing raucously, fading in intensity as they slowly disappear from view.
    {check_random_encounter():
        You hear something approaching rapidly; the voices have attracted trouble!
        -> random_encounter -> menu
    }
    -> destination

=== a1intersection ===

= enter
At the top of the short staircase is a four-way intersection and a grisly scene; no fewer than five dead bodies lie at your feet.
{new_turn(): -> random_encounter -> menu}
-> menu

= rummage_encounter
Your rummaging seems to have attracted some attention...
-> random_encounter -> menu

= menu
    + (body1) Look at the first body.
        You see a human fighter, slumped against a wall. Their broken sword, sheared off about eight inches above the pommel, tells the story of their demise. They wear no armour.

    * {body1} Examine the first body more closely. # turn
        There are no items of any value on the remains, other than a belt pouch containing 5 g.p.
        TODO give pouch w/ 5gp
        {new_turn(): -> rummage_encounter}

    + (body2) Look at the second body.
        You see a human magic-user, {body2sword:
        <> crumpled on the floor. Behind them on the wall is a bloodstained carving of the word 'QUASQUETON' in the common language.
        - else: <> impaled against a wall. The killing sword, still thrust through the body, is lodged in the wall, which has a large section of wood.
        }

    * (body2sword) {body2} Remove the sword from the second body.
        The body crumples to the floor. The sword itself is damaged and seems of low quality.

    * (body2x) {body2} Examine the second body more closely. # turn
        The body is bereft of any items of great value. The robe is bloodstained and ruined, but there is a pocket with a small purse containing 2 g.p. and a pouch full of garlic buds.
        TODO give purse w/ 2gp, pouch w/ garlic buds
        {new_turn(): -> rummage_encounter}

    + (body3) Look at the third body.
        You see a dwarf fighter, face down in the corridor just east of the intersection. In their right hand they still clutch their war hammer. It appears that they crawled, wounded, to this point, since a trail of dried blood leads around the corner. An inside-out sack lies alongside the body, now empty.

    * (body3x) {body3} Examine the third body more closely. # turn
        The body has been stripped of armour, though they still wear a helm. Unfortunately, it has a noticeable dent that renders it worthless. There are no items of value on the remains.
        {new_turn(): -> rummage_encounter}

    + (body4) Look at the fourth body.
        You see a human fighter lying sprawled on the floor, a broken shield nearby. The body has no armour or weapon nearby.

    * (body4x) {body4} Examine the fourth body more closely. # turn
        The body seems to be that of a guard who defended to the death. There are no items of value on the remains.
        {new_turn(): -> rummage_encounter}

    + (body5) Look at the fifth body.
        You see a human fighter on the floor, face down. Their head has been bashed in by some large bludgeoning weapon. There is no armour or weapon on the body{not body5dagger:, except for a dagger sheathed in their belt}.

    * (body5dagger) {body5} Take the dagger from the fifth body.
        You take the dagger.
        TODO give dagger

    + Move into the corridor to the north. # turn
    + Move into the corridor to the west. # turn
    + Move into the corridor to the east. # turn
    + Move into the corridor to the south. # turn

- -> menu
