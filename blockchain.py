from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import hashlib
import json

class Block:
    def __init__(self, index, previous_hash, timestamp, data, nonce=0):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        return Block(0, "0", time.time(), "Genesis Block")

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, data):
        latest_block = self.get_latest_block()
        new_block = Block(
            index=latest_block.index + 1,
            previous_hash=latest_block.hash,
            timestamp=time.time(),
            data=data
        )
        self.proof_of_work(new_block)
        self.chain.append(new_block)
        return new_block

    def proof_of_work(self, block, difficulty=4):
        pattern = "1766" * difficulty
        while not block.hash.startswith(pattern):
            block.nonce += 1
            block.hash = block.calculate_hash()

blockchain = Blockchain()
app = Flask(__name__)
CORS(app)

@app.route('/mine', methods=['POST'])
def mine_block():
    data = request.json.get('data')
    new_block = blockchain.add_block(data)
    return jsonify(new_block.__dict__), 201

@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = [block.__dict__ for block in blockchain.chain]
    return jsonify(chain_data), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1766)