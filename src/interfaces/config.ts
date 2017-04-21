interface Config {
    keys: {private: Buffer, public: Buffer};
    git: {branch: String, long: String};
}

export default Config;