extends GQLClient


# Called when the node enters the scene tree for the first time.
func _ready():
	set_endpoint(false, 'localhost', 3150, '/graphql')


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
