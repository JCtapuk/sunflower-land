import { Equipped } from "features/game/types/bumpkin";

export type NPCName =
  | "betty"
  | "bruce"
  | "hank"
  | "jake"
  | "blacksmith"
  | "grimbly"
  | "grimtooth"
  | "grubnuk"
  | "marcus"
  | "bella"
  | "sofia"
  | "adam"
  | "buttons"
  | "timmy"
  | "misty marvel"
  | "igor"
  | "hammerin' harry"
  | "frankie"
  | "stella"
  | "gabi"
  | "tywin"
  | "pumpkin' pete"
  | "gordy" // TO ADD
  | "bert"
  | "craig"
  | "raven" // TO ADD
  | "birdie"
  | "old salty"
  | "cornwell"
  | "wanderleaf"
  | "otis";
// Ol Salty

export const NPC_WEARABLES: Record<NPCName, Equipped> = {
  wanderleaf: {
    background: "Farm Background",
    body: "Beige Farmer Potion",
    hair: "Sun Spots",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
    pants: "Traveller's Pants",
    shirt: "Traveller's Shirt",
    wings: "Traveller's Backpack",
  },
  jake: {
    body: "Beige Farmer Potion",
    hair: "Basic Hair",
    pants: "Farmer Overalls",
    shirt: "Red Farmer Shirt",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  betty: {
    body: "Beige Farmer Potion",
    hair: "Rancher Hair",
    pants: "Farmer Overalls",
    shirt: "Red Farmer Shirt",
    tool: "Parsnip",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  blacksmith: {
    body: "Light Brown Farmer Potion",
    hair: "Blacksmith Hair",
    pants: "Lumberjack Overalls",
    shirt: "SFL T-Shirt",
    tool: "Hammer",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
  bruce: {
    body: "Beige Farmer Potion",
    hair: "Buzz Cut",
    pants: "Farmer Pants",
    shirt: "Yellow Farmer Shirt",
    coat: "Chef Apron",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  otis: {
    body: "Beige Farmer Potion",
    shirt: "Red Farmer Shirt",
    pants: "Brown Suspenders",
    hair: "Sun Spots",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  hank: {
    body: "Light Brown Farmer Potion",
    shirt: "Red Farmer Shirt",
    pants: "Brown Suspenders",
    hair: "Sun Spots",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  grimbly: {
    body: "Goblin Potion",
    pants: "Brown Suspenders",
    tool: "Hammer",
    hair: "Blacksmith Hair",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
    shirt: "Yellow Farmer Shirt",
  },
  grimtooth: {
    body: "Goblin Potion",
    shirt: "Red Farmer Shirt",
    pants: "Lumberjack Overalls",
    hair: "Blacksmith Hair",
    tool: "Hammer",
    background: "Cemetery Background",
    shoes: "Black Farmer Boots",
  },
  grubnuk: {
    body: "Goblin Potion",
    shirt: "SFL T-Shirt",
    pants: "Farmer Pants",
    hair: "Buzz Cut",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
    tool: "Pirate Scimitar",
  },
  marcus: {
    hair: "Blacksmith Hair",
    shirt: "Striped Blue Shirt",
    pants: "Lumberjack Overalls",
    body: "Light Brown Farmer Potion",
    background: "Farm Background",
    tool: "Farmer Pitchfork",
    shoes: "Black Farmer Boots",
  },
  bella: {
    hair: "Parlour Hair",
    hat: "Straw Hat",
    shirt: "Maiden Top",
    pants: "Peasant Skirt",
    tool: "Farmer Pitchfork",
    body: "Light Brown Farmer Potion",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
  },
  sofia: {
    hair: "Red Long Hair",
    shirt: "Fire Shirt",
    necklace: "Artist Scarf",
    pants: "Farmer Pants",
    body: "Light Brown Farmer Potion",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
    shoes: "Black Farmer Boots",
    onesie: "Eggplant Onesie",
  },
  // Welcomes to plaza - friendly + wholesome
  adam: {
    body: "Beige Farmer Potion",
    hair: "Basic Hair",
    shirt: "Red Farmer Shirt",
    pants: "Blue Suspenders",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
    background: "Farm Background",
  },
  // Young curious boy resident - scared of goblins
  timmy: {
    body: "Beige Farmer Potion",
    onesie: "Bear Onesie",
    background: "Cemetery Background",
    hair: "Buzz Cut",
    shirt: "Striped Red Shirt",
    pants: "Farmer Overalls",
    shoes: "Yellow Boots",
    tool: "Goblin Puppet",
  },
  // Auctioneer who collects rare items and sells them off
  "hammerin' harry": {
    body: "Beige Farmer Potion",
    background: "Dawn Breaker Background",
    hair: "Tangerine Hair",
    shirt: "Bidder's Brocade",
    pants: "Auctioneer Slacks",
    shoes: "Leather Shoes",
    tool: "Auction Megaphone",
    hat: "Harry's Hat",
  },
  // Grave Digger
  craig: {
    body: "Infected Potion",
    background: "Cemetery Background",
    hair: "Sun Spots",
    shirt: "Blue Farmer Shirt",
    pants: "Farmer Pants",
    shoes: "Black Farmer Boots",
    tool: "Grave Diggers Shovel",
  },
  gabi: {
    body: "Beige Farmer Potion",
    background: "Cemetery Background",
    hair: "Parlour Hair",
    shirt: "Bumpkin Art Competition Merch",
    pants: "Farmer Pants",
    shoes: "Black Farmer Boots",
    tool: "Hammer",
  },
  // Mysterious NPC that occasionally appears and sells rare items
  "misty marvel": {
    body: "Beige Farmer Potion",
    background: "Cemetery Background",
    hair: "Red Long Hair",
    shirt: "Fire Shirt",
    pants: "Maiden Skirt",
    shoes: "Black Farmer Boots",
    tool: "Dawn Lamp",
  },
  // Local farmer in Plaza
  "pumpkin' pete": {
    body: "Light Brown Farmer Potion",
    background: "Farm Background",
    hair: "Explorer Hair",
    hat: "Pumpkin Hat",
    shirt: "Yellow Farmer Shirt",
    pants: "Lumberjack Overalls",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
  },
  // Crazy buggy eyed bert
  bert: {
    body: "Beige Farmer Potion",
    background: "Farm Background",
    hair: "Greyed Glory",
    shirt: "Tattered Jacket",
    pants: "Tattered Slacks",
    shoes: "Old Shoes",
    tool: "Farmer Pitchfork",
  },
  // Announces news
  birdie: {
    body: "Light Brown Farmer Potion",
    background: "Farm Background",
    hair: "Rancher Hair",
    shirt: "Blue Farmer Shirt",
    pants: "Lumberjack Overalls",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
  },
  // Old loving grandma of the game
  buttons: {
    body: "Beige Farmer Potion",
    background: "Farm Background",
    hair: "Brown Long Hair",
    shirt: "Fruit Picker Shirt",
    coat: "Chef Apron",
    pants: "Farmer Pants",
    shoes: "Black Farmer Boots",
    tool: "Farmer Pitchfork",
  },
  // Decorations shop
  frankie: {
    body: "Dark Brown Farmer Potion",
    background: "Farm Background",
    hair: "Ash Ponytail",
    shirt: "Club Polo",
    pants: "Brown Suspenders",
    shoes: "Black Farmer Boots",
    tool: "Hammer",
  },
  // Chunky Bumpin
  gordy: {
    body: "Dark Brown Farmer Potion",
    background: "Farm Background",
    hair: "Explorer Hair",
    shirt: "SFL T-Shirt",
    pants: "Farmer Overalls",
    shoes: "Black Farmer Boots",
    tool: "Parsnip",
  },
  // Blacksmith
  igor: {
    body: "Light Brown Farmer Potion",
    hair: "Blacksmith Hair",
    pants: "Lumberjack Overalls",
    shirt: "Blue Farmer Shirt",
    tool: "Hammer",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
  raven: {
    body: "Pale Potion",
    hair: "Goth Hair",
    dress: "Gothic Twilight",
    tool: "Dawn Lamp",
    background: "Farm Background",
    shoes: "Brown Boots",
    wings: "Bat Wings",
    hat: "Victorian Hat",
  },
  // Clothes shop stylist
  stella: {
    body: "Beige Farmer Potion",
    hair: "Pink Ponytail",
    // hat: "Boater Hat",
    pants: "Crimson Skirt",
    shirt: "Chic Gala Blouse",
    tool: "Merch Coffee Mug",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
  // Sunflorian Prince
  tywin: {
    body: "Beige Farmer Potion",
    hair: "Buzz Cut",
    pants: "Fancy Pants",
    shirt: "Fancy Top",
    tool: "Sword",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
  "old salty": {
    body: "Beige Farmer Potion",
    hair: "Buzz Cut",
    pants: "Pirate Pants",
    hat: "Pirate Hat",
    shirt: "Striped Blue Shirt",
    coat: "Pirate General Coat",
    tool: "Pirate Scimitar",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
  cornwell: {
    body: "Beige Farmer Potion",
    hair: "Wise Hair",
    beard: "Wise Beard",
    pants: "Wise Slacks",
    shirt: "Wise Robes",
    tool: "Wise Staff",
    secondaryTool: "Wise Book",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
};
