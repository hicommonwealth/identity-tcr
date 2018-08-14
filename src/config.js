const networks = {
  rinkeby: {
    // Not wholly important for usage
    Migrations: "0x6c749471db11d19453ec9fb26f7d066911d69939",
    DLL: "0x1af320ce14ea844f4098b9e98c607e84e26c3051",
    AttributeStore: "0x6abf4e152eda3c317ce03e671b052c14d70f8d5e",
    PLCRFactory: "0x9c82cb53efe7be593c51c1492eb8f8d52cdad37d",
    ParameterizerFactory: "0x3f17962ce2435a5af92e0bb7ca3762fd78fcb14a",
    RegistryFactory: "0x29e7d60a15647ed711d6ad92ee7cb8b3c75c24c2",
    // Important for usage
    Token: "0xe9f742fcd0e57d6e53fb75934bd6b0624de42e37",
    PLCRVoting: "0x296b7d18b079f834d3ee461eb621f0a7929dc226",
    Parameterizer: "0x2288aaba6c00f72d342c44fc8290997820669585",
    Registry: "0x113a65cb91d4085f0a8faf8f51f6ac73e5ab14fd",
  }
}

const contractParameters = {
    Parameterizer: [
        "minDeposit",
        "pMinDeposit",
        "applyStageLen",
        "pApplyStageLen",
        "commitStageLen",
        "pCommitStageLen",
        "revealStageLen",
        "pRevealStageLen",
        "dispensationPct",
        "pDispensationPct",
        "voteQuorum",
        "pVoteQuorum"
    ],
};

export default {
    networks,
    contractParameters,
}