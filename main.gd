extends Node

var helloExecutor: GQLQueryExecuter
var helloSubscription: GQLQuerySubscriber


func _ready():
	var gqlClient : GqlClient = get_node('/root/GqlClient')
	helloExecutor = gqlClient.query('hello', {"name": "String"}, GQLQuery.new("hello").set_args_v2({"name":"$"}))
	helloExecutor.graphql_response.connect(self.graphql_response)
	add_child(helloExecutor)
	subscribe()

func subscribe():
	var gqlClient : GqlClient = get_node('/root/GqlClient')
	helloSubscription = gqlClient.subscribe('time', {}, GQLQuery.new("time"))
	helloSubscription.new_data.connect(subscription_data)
	add_child(helloSubscription)

func _on_hello_pressed():
	helloExecutor.run({"name": $Name.text})

func graphql_response(data: Dictionary):
	print(data)
	var gql_data = data.get('data', {})
	var hello = gql_data.get('hello', null)
	if hello:
		$Response.text = hello

func subscription_data(data: Dictionary):
	$Time.text = data.time

func _on_button_2_pressed():
	subscribe()
