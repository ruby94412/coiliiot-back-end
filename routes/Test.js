const TEST_JSON_STRING = `{"fota": 0, "uartReadTime": 25, "flow": "", "param_ver": 1, "pwrmod": "normal", "password": "", "netReadTime": 0, "passon": 1, "nolog": "1", "plate": 0, "reg": {"type": 3, "data": "273L62XH9LA89ARF", "prefix": "", "postfix": ""}, "convert": 0, "uconf": [[1, "9600", 8, 2, 0, ""], [], []], "conf": [["tcp", {"type": 0, "data": "273L62XH9LA89ARF", "prefix": "", "postfix": ""}, 300, "mbrtu.tlink.io", "8651", 1, "", "", "", ""], [], [], [], [], [], []], "preset": {"number": "", "delay": "", "smsword": ""}, "apn": ["", "", ""], "cmds": [[""], [], []], "pins": ["pio0", "pio0", "pio0"], "gps": {"pio": [], "fun": []}, "upprot": ["", "", "", "", "", "", ""], "dwprot": ["", "", "", "", "", "", ""], "warn": {"adc0": [], "adc1": [], "vbatt": [], "gpio": []}}`;

const {Router} = require('express');
const testRouter = Router();

testRouter.get("/", (req, res) => {
    console.log(req.query);
    res.status(200).send({
        status: "success",
        data: JSON.parse(TEST_JSON_STRING),
    });
});

module.exports = testRouter;