const Execute = async (res, handler) => {
    console.log('execute')
    try {
        return await handler()
    } catch (error) {
        console.log('error', error)
        return Error(res, 403, 'Ipinagbabawal')
    }
}

const Success = (res, data) => {
    if (data) {
        return res.status(200).json({
            data: data
        })
    } else {
        return res.status(200).json()
    }
}

const Error = (res, code, message) => {
    return res.status(code).json({
        message: message
    })
}

module.exports = {
    Execute,
    Success,
    Error,
}