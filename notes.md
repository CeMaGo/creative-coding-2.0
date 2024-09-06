Notes

- [] random.setSeed(n) 
    - Forces this random genetator instance to use the seed 'n', which can be a number or string type. After setting the seed, all future random numbers will have a deterministic result based on this seed.
    
    If you specify a falsey value, the seed will be cleared from the instance and non-deterministic randomness will return via 'Math.random()'.

- [] seed - random.getSeed()
    - Returns the current seed of this random generator instance, or 'undefined' if none is set.
- [] random.getRandomSeed()
    - Produces a non-deterministic random seed, a floored integer between 0 and 1000000 which is then turned into a string. Unlike other functions, this always uses Math.random() and is never based on the internal seed.
    -  Useful to set an intitial random seed, like so :

```js
// Set an initial random seed
random.setSeed(random.getRandomSeed()); 

//Log it for later reproducibility
consol.log('Random seed: %s', random.getSeed());
```
