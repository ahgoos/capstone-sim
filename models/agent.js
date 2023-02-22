class Agent {
    constructor(idx, _region, _archetype = "random") {
        this.name = _region.name + "_A" + idx;
        this.region = _region;
        this.influence = random(1, 10);
        this.archetype = _archetype;
    }

    consume(meme) {
        switch (this.archetype) {
            case "snob":
                meme.popularity > 225 ? this.upvote(meme) : this.downvote(meme);
                break;
            case "troll":
                meme.popularity < 75 ? this.upvote(meme) : this.downvote(meme);
                break;
            case "random":
                random() < 0.5 ? this.upvote(meme) : this.downvote(meme);
                break;
            default:
                print("Unclear agent archetype: ", this.archetype);
                break;
        }
    }

    upvote(meme) {
        meme.popularity += this.influence;
        // print(this.name + " upvotes " + meme.name + " to: " + meme.popularity);
    }

    downvote(meme) {
        meme.popularity -= this.influence;
        // print(this.name + " downvotes " + meme.name + " to: " + meme.popularity);
    }
}