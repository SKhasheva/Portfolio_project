import configparser

config = configparser.RawConfigParser()
config.read('conf.properties')

details_dict = dict(config.items('db'))

print(details_dict)
